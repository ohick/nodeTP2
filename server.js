const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// MIDDLEWARES
const { isLoggedIn } = require('./middleware/tokenValidation');
const { validate, userValidationRules } = require('./middleware/formValidation');

// CONTROLLERS
const { postRegistration, getRegistration } = require('./controller/user.controller');
const { postLogin, getLogin } = require('./controller/login.controller');

mongoose.connect('mongodb://localhost:27017/tp');

app.set('view engine', 'ejs');

app.use(express.json());
app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    name: 'sessionCookie',
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  })
);

// ROUTES
app.get('/', getRegistration);

app.post('/', userValidationRules(), validate, postRegistration);

app.get('/login', getLogin);

app.post('/login', postLogin);

app.get('/dashboard', isLoggedIn, (req, res) => {
  res.render('pages/dashboard');
});

app.get('/logout', (req, res) => {
  req.session.token = null;
  res.redirect('login');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
