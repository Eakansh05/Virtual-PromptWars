const mongoose = require('mongoose');

const adoptionSchema = new mongoose.Schema({
  // Linked references
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  petId: {
    type: Number,
    required: true
  },
  petName: {
    type: String,
    required: true
  },

  // Step 1: Personal Information
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  age: { type: Number, required: true },
  occupation: { type: String, trim: true, default: '' },

  // Step 2: Living Situation
  housing: { type: String, enum: ['house', 'apartment', 'other'], default: 'house' },
  ownership: { type: String, enum: ['own', 'rent'], default: 'own' },
  hasYard: { type: String, enum: ['yes', 'no', ''], default: '' },
  numAdults: { type: Number, default: 1 },
  numChildren: { type: Number, default: 0 },
  childrenAges: { type: String, default: '' },

  // Step 3: Experience & References
  hasPetExperience: { type: String, enum: ['yes', 'no'], default: 'no' },
  currentPets: { type: String, default: '' },
  hoursAlone: { type: String, default: '' },
  vetName: { type: String, default: '' },
  referenceName: { type: String, required: true },
  referencePhone: { type: String, required: true },
  whyAdopt: { type: String, required: true },

  // Application status
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'approved', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Adoption', adoptionSchema);
