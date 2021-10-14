const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    default: 'user@email.com',
  },
  name: {
    type: String,
  },
  audio: {
    type: String,
  },
  updatedAt: {
    default: new Date().toISOString(),
    type: Date,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
