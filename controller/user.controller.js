const User = require('../model/user.model');

const postRegistration = async (req, res) => {
  if (req.error) {
    return res.render('pages/register', { error: req.error, messages: req.messages, body: req.body });
  }

  const alreadyExists = await User.findOne({ email: req.body.email });

  if (alreadyExists) {
    return res.render('pages/register', { error: true, messages: ['Cet utilisateur existe déjà'], body: null });
  }

  const person = new User(req.body);
  await person.save();
  res.redirect('/login');
};

const getRegistration = (req, res) => {
  res.render('pages/register', { error: false, message: '', body: null });
};

module.exports = {
  getRegistration,
  postRegistration,
};
