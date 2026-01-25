const mongoose = require('mongoose');
const validator = require('validator');
const { default: isEmail } = require('validator/lib/isEmail');

// name , email , photo, password, password confirm

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
  },
  email: {
    type: String,
    required: [true, 'A user mush have a Email'],
    unique: true,
    lowercase: true,
    validate: [validator, isEmail],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'User must confirm password first'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
