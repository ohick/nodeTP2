const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const postLogin = async (req, res) => {
  if (req.error) {
    res.render('pages/login');
  }
  const user = await User.findOne({ email: req.body.email });
  bcrypt.compare(req.body.password, user.password, function (err, result) {
    if (!result) {
      return res.send('Wrong password or user');
    }

    const token = jwt.sign({ email: req.body.email }, 'shhhhh', { expiresIn: '1h' });
    req.session.token = token;
    res.redirect('/dashboard');
  });
};

const getLogin = (req, res) => {
  res.render('pages/login', { error: false, message: '', body: null });
};

module.exports = { postLogin, getLogin };
