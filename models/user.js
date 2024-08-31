const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensures email is unique across the collection
    trim: true // Removes leading and trailing whitespace
  },
  password: {
    type: String,
    required: true
  }
}, {
  collection: 'users' // Explicitly specify the collection name
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
