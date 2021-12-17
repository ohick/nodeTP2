const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
  return [
    body('email').isEmail().withMessage('Invalid email address'),
    body('firstName').trim().not().isEmpty().withMessage('First name: Required field'),
    body('lastName').trim().not().isEmpty().withMessage('Last name: Required field'),
    body('password').not().isEmpty().withMessage('Password: Required field'),
    body('passwordConfirm').custom((value, { req }) => {
      if (value.length && value === req.body.password) {
        return value;
      } else if (!value.length) {
        throw new Error('Confirm Password: Required field');
      }
      throw new Error("Passwords don't match");
    }),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    req.error = false;
    req.messages = [];
    return next();
  }

  req.messages = errors.array().map((err) => err.msg);
  req.error = true;
  next();
};

module.exports = {
  userValidationRules,
  validate,
};
