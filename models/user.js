const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
 email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profile_picture: {
    type: String
  }
}, {
  collection: 'users'
});

const User = mongoose.model('User', userSchema);

module.exports = User;
