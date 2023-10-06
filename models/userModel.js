const mongoose = require('mongoose');

const validator = require('validator');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  photo: {
    type: String
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: [8, 'Password should be at least 8 characters']
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      validator: function(val) {
        return val === this.password;
      },
      message: 'Passwords do not match'
    }
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
