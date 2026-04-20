/* ============================================
   PawFinder — Database Seed Script
   Seeds 10 Adopters (Users + Adoption Apps)
   and 10 Donated Pets into MongoDB
   ============================================ */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./models/User');
const Pet = require('./models/Pet');
const Adoption = require('./models/Adoption');

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI not found in .env!');
  process.exit(1);
}

// ---- 10 Adopter Users ----
const users = [
  { firstName: 'Aarav', lastName: 'Sharma', email: 'aarav.sharma@gmail.com', phone: '+91 98765 43210', password: 'password123' },
  { firstName: 'Priya', lastName: 'Patel', email: 'priya.patel@gmail.com', phone: '+91 87654 32109', password: 'password123' },
  { firstName: 'Rohan', lastName: 'Gupta', email: 'rohan.gupta@yahoo.com', phone: '+91 76543 21098', password: 'password123' },
  { firstName: 'Sneha', lastName: 'Reddy', email: 'sneha.reddy@outlook.com', phone: '+91 65432 10987', password: 'password123' },
  { firstName: 'Vikram', lastName: 'Singh', email: 'vikram.singh@gmail.com', phone: '+91 54321 09876', password: 'password123' },
  { firstName: 'Ananya', lastName: 'Iyer', email: 'ananya.iyer@gmail.com', phone: '+91 43210 98765', password: 'password123' },
  { firstName: 'Karan', lastName: 'Mehta', email: 'karan.mehta@hotmail.com', phone: '+91 32109 87654', password: 'password123' },
  { firstName: 'Divya', lastName: 'Nair', email: 'divya.nair@gmail.com', phone: '+91 21098 76543', password: 'password123' },
  { firstName: 'Arjun', lastName: 'Verma', email: 'arjun.verma@yahoo.com', phone: '+91 10987 65432', password: 'password123' },
  { firstName: 'Meera', lastName: 'Joshi', email: 'meera.joshi@gmail.com', phone: '+91 99887 76655', password: 'password123' }
];

// ---- 10 Adoption Applications ----
const adoptions = [
  {
    petId: 1, petName: 'Buddy',
    firstName: 'Aarav', lastName: 'Sharma', email: 'aarav.sharma@gmail.com',
    phone: '+91 98765 43210', address: '42 MG Road, Bangalore, Karnataka 560001',
    age: 28, occupation: 'Software Engineer',
    housing: 'apartment', ownership: 'rent', hasYard: 'no',
    numAdults: 2, numChildren: 0, childrenAges: '',
    hasPetExperience: 'yes', currentPets: '1 cat',
    hoursAlone: '4-6', vetName: 'Dr. Anil Kumar — PetCare Clinic',
    referenceName: 'Rahul Sharma', referencePhone: '+91 98765 11111',
    whyAdopt: 'I grew up with Golden Retrievers and have always wanted one of my own. Buddy seems like the perfect companion for my active lifestyle. I work from home most days so he won\'t be alone much.',
    status: 'approved'
  },
  {
    petId: 3, petName: 'Milo',
    firstName: 'Priya', lastName: 'Patel', email: 'priya.patel@gmail.com',
    phone: '+91 87654 32109', address: '15 Juhu Beach Road, Mumbai, Maharashtra 400049',
    age: 32, occupation: 'Graphic Designer',
    housing: 'apartment', ownership: 'own', hasYard: 'no',
    numAdults: 1, numChildren: 0, childrenAges: '',
    hasPetExperience: 'yes', currentPets: '',
    hoursAlone: '2-4', vetName: 'Dr. Meena Shah — Happy Paws Vet',
    referenceName: 'Neha Patel', referencePhone: '+91 87654 22222',
    whyAdopt: 'I\'ve been wanting a calm, indoor cat for my apartment. Milo\'s personality sounds perfect — a lap cat who loves gentle pets. My apartment is cozy and I work from home as a freelancer.',
    status: 'approved'
  },
  {
    petId: 5, petName: 'Kiwi',
    firstName: 'Rohan', lastName: 'Gupta', email: 'rohan.gupta@yahoo.com',
    phone: '+91 76543 21098', address: '88 Civil Lines, New Delhi 110054',
    age: 25, occupation: 'College Student',
    housing: 'house', ownership: 'own', hasYard: 'yes',
    numAdults: 4, numChildren: 1, childrenAges: '16',
    hasPetExperience: 'yes', currentPets: '2 fish',
    hoursAlone: '2-4', vetName: '',
    referenceName: 'Amit Gupta', referencePhone: '+91 76543 33333',
    whyAdopt: 'My younger sister has been fascinated by birds since she was little. We\'d love to give Kiwi a loving home. Our house is spacious with a dedicated room where the cage will be placed near the window.',
    status: 'pending'
  },
  {
    petId: 7, petName: 'Daisy',
    firstName: 'Sneha', lastName: 'Reddy', email: 'sneha.reddy@outlook.com',
    phone: '+91 65432 10987', address: '23 Banjara Hills, Hyderabad, Telangana 500034',
    age: 35, occupation: 'Doctor',
    housing: 'house', ownership: 'own', hasYard: 'yes',
    numAdults: 2, numChildren: 2, childrenAges: '7, 10',
    hasPetExperience: 'yes', currentPets: '1 dog (Labrador)',
    hoursAlone: '4-6', vetName: 'Dr. Srinivas — Pet Hospital Banjara',
    referenceName: 'Kavitha Reddy', referencePhone: '+91 65432 44444',
    whyAdopt: 'We already have a Labrador and our kids have been begging for another dog. Daisy seems great with children and other dogs. We have a large house with garden — perfect for a Beagle!',
    status: 'approved'
  },
  {
    petId: 2, petName: 'Luna',
    firstName: 'Vikram', lastName: 'Singh', email: 'vikram.singh@gmail.com',
    phone: '+91 54321 09876', address: '7 Sector 15, Chandigarh 160015',
    age: 30, occupation: 'Fitness Trainer',
    housing: 'house', ownership: 'own', hasYard: 'yes',
    numAdults: 2, numChildren: 0, childrenAges: '',
    hasPetExperience: 'yes', currentPets: '',
    hoursAlone: '0-2', vetName: 'Dr. Harpreet — Chandigarh Pet Clinic',
    referenceName: 'Jaspal Singh', referencePhone: '+91 54321 55555',
    whyAdopt: 'As a fitness trainer, I run 10kms every morning and hike on weekends. Luna would be the perfect running partner! My wife and I have been wanting a Husky for years. We live in a cooler climate which is ideal for the breed.',
    status: 'reviewed'
  },
  {
    petId: 6, petName: 'Snowball',
    firstName: 'Ananya', lastName: 'Iyer', email: 'ananya.iyer@gmail.com',
    phone: '+91 43210 98765', address: '56 Anna Nagar, Chennai, Tamil Nadu 600040',
    age: 27, occupation: 'Teacher',
    housing: 'apartment', ownership: 'rent', hasYard: 'no',
    numAdults: 1, numChildren: 0, childrenAges: '',
    hasPetExperience: 'no', currentPets: '',
    hoursAlone: '6-8', vetName: '',
    referenceName: 'Lakshmi Iyer', referencePhone: '+91 43210 66666',
    whyAdopt: 'I\'m a first-time pet owner but I\'ve done extensive research on rabbit care. Snowball seems like a gentle introduction to pet ownership. I\'ve already bought a large enclosure, hay, and supplies!',
    status: 'pending'
  },
  {
    petId: 4, petName: 'Shadow',
    firstName: 'Karan', lastName: 'Mehta', email: 'karan.mehta@hotmail.com',
    phone: '+91 32109 87654', address: '101 Vastrapur, Ahmedabad, Gujarat 380015',
    age: 29, occupation: 'Photographer',
    housing: 'apartment', ownership: 'own', hasYard: 'no',
    numAdults: 1, numChildren: 0, childrenAges: '',
    hasPetExperience: 'yes', currentPets: '1 cat (Persian)',
    hoursAlone: '2-4', vetName: 'Dr. Pankaj — Ahmedabad Pet Care',
    referenceName: 'Rishi Mehta', referencePhone: '+91 32109 77777',
    whyAdopt: 'I already have a Persian cat and she could use a feline companion. Shadow\'s independent personality would complement my cat\'s personality well. Plus, I love photographing black cats — they\'re stunning!',
    status: 'approved'
  },
  {
    petId: 8, petName: 'Cleo',
    firstName: 'Divya', lastName: 'Nair', email: 'divya.nair@gmail.com',
    phone: '+91 21098 76543', address: '33 Marine Drive, Kochi, Kerala 682031',
    age: 31, occupation: 'Architect',
    housing: 'house', ownership: 'own', hasYard: 'yes',
    numAdults: 3, numChildren: 1, childrenAges: '5',
    hasPetExperience: 'yes', currentPets: '',
    hoursAlone: '4-6', vetName: 'Dr. Thomas — Kochi Vet Hospital',
    referenceName: 'Suresh Nair', referencePhone: '+91 21098 88888',
    whyAdopt: 'My daughter has been asking for a cat for her birthday. Cleo\'s chatty personality sounds delightful — she\'d bring so much joy to our family. Our house has plenty of space for her to explore.',
    status: 'reviewed'
  },
  {
    petId: 9, petName: 'Raju',
    firstName: 'Arjun', lastName: 'Verma', email: 'arjun.verma@yahoo.com',
    phone: '+91 10987 65432', address: '19 Lajpat Nagar, New Delhi 110024',
    age: 26, occupation: 'Marketing Manager',
    housing: 'house', ownership: 'rent', hasYard: 'yes',
    numAdults: 2, numChildren: 0, childrenAges: '',
    hasPetExperience: 'no', currentPets: '',
    hoursAlone: '6-8', vetName: '',
    referenceName: 'Deepak Verma', referencePhone: '+91 10987 99999',
    whyAdopt: 'I\'ve always wanted to adopt a desi dog — they\'re the most loyal and resilient. Raju looks like an absolute gem. My flatmate and I both work but we have staggered schedules so Raju won\'t be alone much.',
    status: 'pending'
  },
  {
    petId: 10, petName: 'Meera',
    firstName: 'Meera', lastName: 'Joshi', email: 'meera.joshi@gmail.com',
    phone: '+91 99887 76655', address: '45 Koregaon Park, Pune, Maharashtra 411001',
    age: 33, occupation: 'Content Writer',
    housing: 'apartment', ownership: 'own', hasYard: 'no',
    numAdults: 1, numChildren: 0, childrenAges: '',
    hasPetExperience: 'yes', currentPets: '1 cat',
    hoursAlone: '0-2', vetName: 'Dr. Pradeep — Pune Pet Wellness',
    referenceName: 'Anjali Joshi', referencePhone: '+91 99887 10101',
    whyAdopt: 'Meera the dog and Meera the human — it\'s meant to be! 😄 I work from home full-time and my apartment is pet-friendly. I already have a cat so the Indian Spitz\'s apartment-friendly nature is perfect.',
    status: 'approved'
  }
];

// ---- 10 Donated/Rehomed Pets ----
const donatedPets = [
  {
    name: 'Bruno', type: 'dog', breed: 'Labrador Retriever',
    age: '4 years', gender: 'male', size: 'Large',
    image: '', fee: 'Free',
    description: 'Bruno is a loving 4-year-old Labrador who needs a new home due to our family relocating abroad. He\'s great with kids, fully vaccinated, and knows basic commands like sit, stay, and shake. Bruno loves swimming and car rides.',
    traits: [
      { icon: '📏', label: 'Size', value: 'Large' },
      { icon: '🎂', label: 'Age', value: '4 Years' },
      { icon: '💉', label: 'Vaccinated', value: 'Yes' },
      { icon: '✂️', label: 'Neutered', value: 'Yes' },
      { icon: '🏠', label: 'House Trained', value: 'Yes' },
      { icon: '🏊', label: 'Loves', value: 'Swimming' }
    ],
    tags: ['Rehomed', 'Verified', 'Family Dog', 'Trained']
  },
  {
    name: 'Whiskers', type: 'cat', breed: 'Persian Cat',
    age: '3 years', gender: 'female', size: 'Medium',
    image: '', fee: 'Free',
    description: 'Whiskers is a beautiful Persian with a calm and affectionate personality. She\'s being rehomed because our baby developed allergies. Whiskers is litter-trained, vet-checked, and loves to be brushed.',
    traits: [
      { icon: '📏', label: 'Size', value: 'Medium' },
      { icon: '🎂', label: 'Age', value: '3 Years' },
      { icon: '💉', label: 'Vaccinated', value: 'Yes' },
      { icon: '✂️', label: 'Spayed', value: 'Yes' },
      { icon: '🐱', label: 'Litter Trained', value: 'Yes' },
      { icon: '💇', label: 'Grooming', value: 'Loves It' }
    ],
    tags: ['Rehomed', 'Verified', 'Calm', 'Indoor']
  },
  {
    name: 'Rocky', type: 'dog', breed: 'German Shepherd',
    age: '2 years', gender: 'male', size: 'Large',
    image: '', fee: 'Free',
    description: 'Rocky is a strong and intelligent German Shepherd. Due to a job transfer, we cannot take him along. He\'s protective, loyal, and excellent as a guard dog. Rocky needs an owner with experience handling large breeds.',
    traits: [
      { icon: '📏', label: 'Size', value: 'Large' },
      { icon: '🎂', label: 'Age', value: '2 Years' },
      { icon: '💉', label: 'Vaccinated', value: 'Yes' },
      { icon: '✂️', label: 'Neutered', value: 'Yes' },
      { icon: '🛡️', label: 'Guard Dog', value: 'Yes' },
      { icon: '🧠', label: 'Intelligence', value: 'Very High' }
    ],
    tags: ['Rehomed', 'Verified', 'Guard Dog', 'Loyal']
  },
  {
    name: 'Coco', type: 'bird', breed: 'Cockatiel',
    age: '1.5 years', gender: 'male', size: 'Small',
    image: '', fee: 'Free',
    description: 'Coco is a cheerful and social Cockatiel who loves to whistle tunes and sit on your shoulder. Being rehomed as the owner is moving to a hostel for studies. Comes with cage, food supplies, and toys.',
    traits: [
      { icon: '📏', label: 'Size', value: 'Small' },
      { icon: '🎂', label: 'Age', value: '1.5 Years' },
      { icon: '💉', label: 'Health Check', value: 'Passed' },
      { icon: '🗣️', label: 'Whistles', value: 'Yes' },
      { icon: '✋', label: 'Hand Tamed', value: 'Yes' },
      { icon: '🎵', label: 'Loves', value: 'Music' }
    ],
    tags: ['Rehomed', 'Verified', 'Musical', 'Social']
  },
  {
    name: 'Ginger', type: 'cat', breed: 'Maine Coon Mix',
    age: '5 years', gender: 'female', size: 'Large',
    image: '', fee: 'Free',
    description: 'Ginger is a majestic Maine Coon mix with a fluffy orange coat. She\'s gentle, loves to cuddle, and gets along with other cats. Rehoming due to landlord\'s new no-pet policy. Ginger deserves a home where she can stay forever.',
    traits: [
      { icon: '📏', label: 'Size', value: 'Large' },
      { icon: '🎂', label: 'Age', value: '5 Years' },
      { icon: '💉', label: 'Vaccinated', value: 'Yes' },
      { icon: '✂️', label: 'Spayed', value: 'Yes' },
      { icon: '🐱', label: 'Litter Trained', value: 'Yes' },
      { icon: '🧡', label: 'Personality', value: 'Gentle Giant' }
    ],
    tags: ['Rehomed', 'Verified', 'Fluffy', 'Gentle']
  },
  {
    name: 'Toffee', type: 'dog', breed: 'Pomeranian',
    age: '1 year', gender: 'female', size: 'Small',
    image: '', fee: 'Free',
    description: 'Toffee is an adorable Pomeranian puppy with a golden coat. Super playful, loves belly rubs, and gets along with everyone. Owner is a senior citizen who can no longer keep up with Toffee\'s energy.',
    traits: [
      { icon: '📏', label: 'Size', value: 'Small' },
      { icon: '🎂', label: 'Age', value: '1 Year' },
      { icon: '💉', label: 'Vaccinated', value: 'Yes' },
      { icon: '✂️', label: 'Spayed', value: 'Yes' },
      { icon: '🏠', label: 'Apartment', value: 'Friendly' },
      { icon: '⚡', label: 'Energy', value: 'High' }
    ],
    tags: ['Rehomed', 'Verified', 'Playful', 'Tiny']
  },
  {
    name: 'Oreo', type: 'rabbit', breed: 'Dutch Rabbit',
    age: '1 year', gender: 'male', size: 'Small',
    image: '', fee: 'Free',
    description: 'Oreo is a charming black-and-white Dutch Rabbit with a sweet temperament. He loves being petted and enjoys hopping around the house. Rehoming because the family is moving to a smaller apartment.',
    traits: [
      { icon: '📏', label: 'Size', value: 'Small' },
      { icon: '🎂', label: 'Age', value: '1 Year' },
      { icon: '💉', label: 'Health Check', value: 'Passed' },
      { icon: '✂️', label: 'Neutered', value: 'Yes' },
      { icon: '🥕', label: 'Diet', value: 'Hay & Vegs' },
      { icon: '💤', label: 'Temperament', value: 'Sweet' }
    ],
    tags: ['Rehomed', 'Verified', 'Cute', 'Gentle']
  },
  {
    name: 'Sheru', type: 'dog', breed: 'Indie (Street Rescued)',
    age: '3 years', gender: 'male', size: 'Medium',
    image: '', fee: 'Free',
    description: 'Sheru was rescued from the streets and nursed back to health. He\'s now a healthy, happy boy looking for his forever home. Sheru is incredibly loyal, low-maintenance, and great with other street dogs. Current foster family cannot keep him permanently.',
    traits: [
      { icon: '📏', label: 'Size', value: 'Medium' },
      { icon: '🎂', label: 'Age', value: '3 Years' },
      { icon: '💉', label: 'Vaccinated', value: 'Yes' },
      { icon: '✂️', label: 'Neutered', value: 'Yes' },
      { icon: '💪', label: 'Health', value: 'Excellent' },
      { icon: '🌡️', label: 'Climate', value: 'All Weather' }
    ],
    tags: ['Rehomed', 'Verified', 'Rescued', 'Desi']
  },
  {
    name: 'Mimi', type: 'cat', breed: 'British Shorthair',
    age: '2 years', gender: 'female', size: 'Medium',
    image: '', fee: 'Free',
    description: 'Mimi is a gorgeous British Shorthair with a plush grey coat and copper eyes. She\'s calm, independent, and perfect for someone who wants a low-maintenance but affectionate cat. Being rehomed due to owner\'s long-term travel plans.',
    traits: [
      { icon: '📏', label: 'Size', value: 'Medium' },
      { icon: '🎂', label: 'Age', value: '2 Years' },
      { icon: '💉', label: 'Vaccinated', value: 'Yes' },
      { icon: '✂️', label: 'Spayed', value: 'Yes' },
      { icon: '🐱', label: 'Litter Trained', value: 'Yes' },
      { icon: '👑', label: 'Personality', value: 'Regal' }
    ],
    tags: ['Rehomed', 'Verified', 'Independent', 'Elegant']
  },
  {
    name: 'Chirpy', type: 'bird', breed: 'Budgerigar (Budgie)',
    age: '6 months', gender: 'female', size: 'Small',
    image: '', fee: 'Free',
    description: 'Chirpy is a delightful sky-blue Budgie who fills the room with cheerful chirps all day. She\'s young, healthy, and hand-tamed. Owner\'s child developed asthma, so they need to find Chirpy a new loving home. Comes with cage and month\'s supply of seeds.',
    traits: [
      { icon: '📏', label: 'Size', value: 'Small' },
      { icon: '🎂', label: 'Age', value: '6 Months' },
      { icon: '💉', label: 'Health Check', value: 'Passed' },
      { icon: '🗣️', label: 'Vocal', value: 'Very' },
      { icon: '✋', label: 'Hand Tamed', value: 'Yes' },
      { icon: '🎨', label: 'Color', value: 'Sky Blue' }
    ],
    tags: ['Rehomed', 'Verified', 'Colorful', 'Cheerful']
  }
];

// ---- SEED FUNCTION ----
async function seedDatabase() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB Atlas\n');

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await User.deleteMany({});
    await Adoption.deleteMany({});
    await Pet.deleteMany({});
    console.log('   ✓ Cleared Users, Adoptions, and Pets collections\n');

    // Seed Users
    console.log('👤 Seeding 10 Adopter Users...');
    const createdUsers = [];
    for (const userData of users) {
      const user = new User(userData);
      await user.save();
      createdUsers.push(user);
      console.log(`   ✓ ${user.firstName} ${user.lastName} (${user.email})`);
    }
    console.log('');

    // Seed Adoptions (link userId from created users)
    console.log('📋 Seeding 10 Adoption Applications...');
    for (let i = 0; i < adoptions.length; i++) {
      const adoptionData = { ...adoptions[i], userId: createdUsers[i]._id };
      const adoption = new Adoption(adoptionData);
      await adoption.save();
      console.log(`   ✓ ${adoption.firstName} ${adoption.lastName} → ${adoption.petName} [${adoption.status.toUpperCase()}]`);
    }
    console.log('');

    // Seed Donated Pets
    console.log('🐾 Seeding 10 Donated/Rehomed Pets...');
    for (const petData of donatedPets) {
      const pet = new Pet(petData);
      await pet.save();
      console.log(`   ✓ ${pet.name} (${pet.breed}) — ${pet.type}`);
    }

    console.log('\n🎉 Database seeded successfully!');
    console.log(`   📊 Summary:`);
    console.log(`   • ${createdUsers.length} Users`);
    console.log(`   • ${adoptions.length} Adoption Applications`);
    console.log(`   • ${donatedPets.length} Donated Pets\n`);

  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed.');
  }
}

seedDatabase();
