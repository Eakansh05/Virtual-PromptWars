/* ============================================
   PawFinder — Backend API Server
   Node.js + Express + MongoDB (Mongoose)
   ============================================ */

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Models
const User = require('./models/User');
const Pet = require('./models/Pet');
const Adoption = require('./models/Adoption');

const app = express();
const PORT = process.env.PORT || 3000;

// ---- Middleware ----
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '..')));

// ---- MongoDB Connection ----
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI not found in .env file!');
  console.error('   Copy .env.example to .env and add your MongoDB Atlas connection string.');
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });

// ============================================
// API ROUTES
// ============================================

// ---- Health Check ----
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'PawFinder API is running 🐾' });
});

// ---- USER SIGNUP ----
app.post('/api/users/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email already exists' });
    }

    const user = new User({ firstName, lastName, email, phone, password });
    await user.save();

    console.log(`✅ New user registered: ${email}`);
    res.status(201).json({
      message: 'Account created successfully!',
      user: user.toJSON()
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: errors.join(', ') });
    }
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Server error during signup' });
  }
});

// ---- USER LOGIN ----
app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    console.log(`✅ User logged in: ${email}`);
    res.json({
      message: 'Login successful!',
      user: user.toJSON()
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// ---- GET ALL PETS ----
app.get('/api/pets', async (req, res) => {
  try {
    const pets = await Pet.find().sort({ createdAt: -1 });
    res.json(pets);
  } catch (err) {
    console.error('Get pets error:', err);
    res.status(500).json({ error: 'Failed to fetch pets' });
  }
});

// ---- ADD NEW PET ----
app.post('/api/pets', async (req, res) => {
  try {
    const pet = new Pet(req.body);
    await pet.save();

    console.log(`✅ New pet registered: ${pet.name} (${pet.breed})`);
    res.status(201).json({
      message: 'Pet registered successfully!',
      pet
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: errors.join(', ') });
    }
    console.error('Add pet error:', err);
    res.status(500).json({ error: 'Failed to register pet' });
  }
});

// ---- SUBMIT ADOPTION APPLICATION ----
app.post('/api/adoptions', async (req, res) => {
  try {
    const adoption = new Adoption(req.body);
    await adoption.save();

    console.log(`✅ Adoption application submitted: ${adoption.firstName} ${adoption.lastName} → ${adoption.petName}`);
    res.status(201).json({
      message: 'Adoption application submitted successfully!',
      adoption
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: errors.join(', ') });
    }
    console.error('Adoption submit error:', err);
    res.status(500).json({ error: 'Failed to submit adoption application' });
  }
});

// ---- GET ALL ADOPTIONS ----
app.get('/api/adoptions', async (req, res) => {
  try {
    const adoptions = await Adoption.find().sort({ createdAt: -1 });
    res.json(adoptions);
  } catch (err) {
    console.error('Get adoptions error:', err);
    res.status(500).json({ error: 'Failed to fetch adoptions' });
  }
});

// ---- GET ALL USERS (admin) ----
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error('Get users error:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// ---- Catch-all: serve frontend ----
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// ---- Start Server ----
app.listen(PORT, () => {
  console.log(`\n🐾 PawFinder API running at http://localhost:${PORT}`);
  console.log(`📦 Endpoints:`);
  console.log(`   POST /api/users/signup`);
  console.log(`   POST /api/users/login`);
  console.log(`   GET  /api/pets`);
  console.log(`   POST /api/pets`);
  console.log(`   POST /api/adoptions`);
  console.log(`   GET  /api/adoptions`);
  console.log(`   GET  /api/users\n`);
});
