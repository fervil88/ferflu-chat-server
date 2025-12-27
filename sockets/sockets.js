const { io } = require('../index.js');

// Sockets messages
io.on('connection', (client) => {
  console.log('Client connected');

  client.emit('active-bands');

  client.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
