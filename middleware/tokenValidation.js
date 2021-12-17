const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
  const token = req.session.token;

  jwt.verify(token, 'shhhhh', (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    next();
  });
};

module.exports = {
  isLoggedIn,
};
