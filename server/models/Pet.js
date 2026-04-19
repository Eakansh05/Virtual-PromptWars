const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Pet name is required'],
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['dog', 'cat', 'bird', 'rabbit', 'other'],
    lowercase: true
  },
  breed: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female'],
    lowercase: true
  },
  size: {
    type: String,
    required: true,
    enum: ['Small', 'Medium', 'Large']
  },
  image: {
    type: String,
    default: ''
  },
  fee: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  traits: [{
    icon: String,
    label: String,
    value: String
  }],
  tags: [String],
  adopted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pet', petSchema);
