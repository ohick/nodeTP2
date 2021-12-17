const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, saltRounds);

  next();
});

module.exports = mongoose.model('User', UserSchema);
