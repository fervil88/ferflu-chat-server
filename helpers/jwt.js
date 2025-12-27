const jwt = require('jsonwebtoken');

const genJWT = (uid, name, email) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name, email };
    jwt.sign(
      payload,
      process.env.JWT_KEY,
      {
        expiresIn: '24h',
      },
      (err, token) => {
        if (err) {
          reject("can't generate the jwt");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { genJWT };
