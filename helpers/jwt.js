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

const checkJWT = (token = '') => {
  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    return [true, uid];
  } catch (error) {
    return [false, null];
  }
};

module.exports = { genJWT, checkJWT };
