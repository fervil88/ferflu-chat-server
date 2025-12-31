const { checkJWT } = require('../helpers/jwt.js');
const { io } = require('../index.js');
const {
  userConnected,
  userDisconnected,
  saveMessage,
} = require('../controlles/socket.js');

// Sockets messages
io.on('connection', (client) => {
  const [valid, uid] = checkJWT(client.handshake.headers['x-token']);
  console.log(valid, uid);
  if (!valid) {
    return client.disconnect();
  }
  userConnected(uid);

  // Put the user into a room
  client.join(uid);

  // Listen the client message to be send
  client.on('personal-message', async (payload) => {
    await saveMessage(payload);
    io.to(payload.to).emit('personal-message', payload);
  });

  client.on('disconnect', () => {
    userDisconnected(uid);
  });
});
