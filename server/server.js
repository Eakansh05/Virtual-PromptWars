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

// ============================================
// RAZORPAY PAYMENT GATEWAY
// ============================================
const Razorpay = require('razorpay');
const crypto = require('crypto');

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

let razorpay = null;
if (RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET && !RAZORPAY_KEY_ID.includes('YourKeyHere')) {
  razorpay = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET
  });
  console.log('💳 Razorpay payment gateway initialized (Test Mode)');
} else {
  console.log('⚠️  Razorpay keys not configured — payments will run in demo mode');
}

// Get Razorpay public key (safe to expose)
app.get('/api/razorpay-key', (req, res) => {
  res.json({ key: RAZORPAY_KEY_ID || null });
});

// Create Razorpay Order
app.post('/api/create-order', async (req, res) => {
  try {
    const { planName, amount } = req.body;

    if (!planName || !amount) {
      return res.status(400).json({ error: 'Plan name and amount are required' });
    }

    // If Razorpay is not configured, return a demo order
    if (!razorpay) {
      const demoOrder = {
        id: 'demo_order_' + Date.now(),
        amount: amount * 100,
        currency: 'INR',
        receipt: `pawfinder_${planName}_${Date.now()}`,
        status: 'created',
        demo: true
      };
      console.log(`💳 [DEMO] Order created for ${planName}: ₹${amount}`);
      return res.json({ order: demoOrder, demo: true });
    }

    const options = {
      amount: amount * 100, // Razorpay expects paise (₹299 = 29900 paise)
      currency: 'INR',
      receipt: `pawfinder_${planName}_${Date.now()}`,
      notes: {
        plan: planName,
        platform: 'PawFinder'
      }
    };

    const order = await razorpay.orders.create(options);
    console.log(`💳 Razorpay order created: ${order.id} for ${planName} (₹${amount})`);
    res.json({ order, demo: false });
  } catch (err) {
    console.error('❌ Razorpay order creation failed:', err.message);
    res.status(500).json({ error: 'Failed to create payment order' });
  }
});

// Verify Razorpay Payment Signature
app.post('/api/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planName } = req.body;

    // Demo mode verification
    if (!razorpay || razorpay_order_id.startsWith('demo_')) {
      console.log(`✅ [DEMO] Payment verified for ${planName}`);
      return res.json({ verified: true, demo: true });
    }

    // Real signature verification
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      console.log(`✅ Payment verified: ${razorpay_payment_id} for ${planName}`);
      res.json({ verified: true, paymentId: razorpay_payment_id });
    } else {
      console.error('❌ Payment signature verification failed');
      res.status(400).json({ verified: false, error: 'Invalid payment signature' });
    }
  } catch (err) {
    console.error('❌ Payment verification error:', err.message);
    res.status(500).json({ error: 'Payment verification failed' });
  }
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
