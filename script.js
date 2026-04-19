/* ============================================
   PawFinder — Pet Adoption Website
   JavaScript — Interactivity & Data
   ============================================ */

// ---- Pet Data ----
const pets = [
  {
    id: 1,
    name: "Buddy",
    type: "dog",
    breed: "Golden Retriever",
    age: "2 years",
    gender: "male",
    size: "Large",
    image: "images/golden_retriever.png",
    fee: "$150",
    description: "Buddy is a joyful and energetic Golden Retriever who loves nothing more than playing fetch and cuddling on the couch. He's great with kids and other pets, making him the perfect family companion. Buddy is fully trained, house-broken, and eager to please.",
    traits: [
      { icon: "📏", label: "Size", value: "Large" },
      { icon: "🎂", label: "Age", value: "2 Years" },
      { icon: "💉", label: "Vaccinated", value: "Yes" },
      { icon: "✂️", label: "Neutered", value: "Yes" },
      { icon: "🏠", label: "House Trained", value: "Yes" },
      { icon: "🐕", label: "Good With", value: "Kids & Pets" }
    ],
    tags: ["Friendly", "Trained", "Energetic", "Family Dog"]
  },
  {
    id: 2,
    name: "Luna",
    type: "dog",
    breed: "Siberian Husky",
    age: "3 years",
    gender: "female",
    size: "Large",
    image: "images/husky.png",
    fee: "$175",
    description: "Luna is a stunning Siberian Husky with piercing blue eyes and a loving personality. She's an adventurous spirit who loves long walks and snowy weather. Luna is loyal, intelligent, and would thrive with an active owner who enjoys the outdoors.",
    traits: [
      { icon: "📏", label: "Size", value: "Large" },
      { icon: "🎂", label: "Age", value: "3 Years" },
      { icon: "💉", label: "Vaccinated", value: "Yes" },
      { icon: "✂️", label: "Spayed", value: "Yes" },
      { icon: "🏠", label: "House Trained", value: "Yes" },
      { icon: "🏃", label: "Energy", value: "High" }
    ],
    tags: ["Adventurous", "Loyal", "Beautiful", "Active"]
  },
  {
    id: 3,
    name: "Milo",
    type: "cat",
    breed: "Orange Tabby",
    age: "1 year",
    gender: "male",
    size: "Medium",
    image: "images/orange_cat.png",
    fee: "$100",
    description: "Milo is a charming orange tabby with the most soothing purr you've ever heard. He's a lap cat through and through — give him a warm spot and some gentle pets, and he's the happiest cat alive. Milo is litter-trained and gets along well with other cats.",
    traits: [
      { icon: "📏", label: "Size", value: "Medium" },
      { icon: "🎂", label: "Age", value: "1 Year" },
      { icon: "💉", label: "Vaccinated", value: "Yes" },
      { icon: "✂️", label: "Neutered", value: "Yes" },
      { icon: "🐱", label: "Litter Trained", value: "Yes" },
      { icon: "😴", label: "Energy", value: "Calm" }
    ],
    tags: ["Calm", "Affectionate", "Lap Cat", "Indoor"]
  },
  {
    id: 4,
    name: "Shadow",
    type: "cat",
    breed: "Domestic Shorthair",
    age: "4 years",
    gender: "male",
    size: "Medium",
    image: "images/black_cat.png",
    fee: "$90",
    description: "Shadow is a sleek and mysterious black cat with golden eyes that glow in the light. Don't let his enigmatic appearance fool you — he's a total sweetheart who loves chin scratches and chasing laser pointers. Shadow is independent yet affectionate.",
    traits: [
      { icon: "📏", label: "Size", value: "Medium" },
      { icon: "🎂", label: "Age", value: "4 Years" },
      { icon: "💉", label: "Vaccinated", value: "Yes" },
      { icon: "✂️", label: "Neutered", value: "Yes" },
      { icon: "🐱", label: "Litter Trained", value: "Yes" },
      { icon: "🌙", label: "Personality", value: "Curious" }
    ],
    tags: ["Independent", "Curious", "Gentle", "Playful"]
  },
  {
    id: 5,
    name: "Kiwi",
    type: "bird",
    breed: "Green Parakeet",
    age: "1 year",
    gender: "male",
    size: "Small",
    image: "images/parakeet.png",
    fee: "$50",
    description: "Kiwi is a vibrant green parakeet full of personality and song. He loves to chirp along to music and can even mimic a few words! Kiwi is hand-tamed and enjoys sitting on shoulders. He'd make a wonderful companion for bird lovers of all ages.",
    traits: [
      { icon: "📏", label: "Size", value: "Small" },
      { icon: "🎂", label: "Age", value: "1 Year" },
      { icon: "💉", label: "Health Check", value: "Passed" },
      { icon: "🗣️", label: "Talks", value: "A Little" },
      { icon: "✋", label: "Hand Tamed", value: "Yes" },
      { icon: "🎵", label: "Loves", value: "Music" }
    ],
    tags: ["Social", "Musical", "Hand-tamed", "Colorful"]
  },
  {
    id: 6,
    name: "Snowball",
    type: "rabbit",
    breed: "Holland Lop",
    age: "8 months",
    gender: "female",
    size: "Small",
    image: "images/bunny.png",
    fee: "$60",
    description: "Snowball is an adorable Holland Lop rabbit with soft white fur and floppy ears that will melt your heart. She's gentle, curious, and loves to explore. Snowball enjoys being held and is perfect for families looking for a calm and cuddly pet.",
    traits: [
      { icon: "📏", label: "Size", value: "Small" },
      { icon: "🎂", label: "Age", value: "8 Months" },
      { icon: "💉", label: "Health Check", value: "Passed" },
      { icon: "✂️", label: "Spayed", value: "Yes" },
      { icon: "🥕", label: "Diet", value: "Hay & Vegs" },
      { icon: "💤", label: "Temperament", value: "Gentle" }
    ],
    tags: ["Gentle", "Fluffy", "Family-friendly", "Cuddly"]
  },
  {
    id: 7,
    name: "Daisy",
    type: "dog",
    breed: "Beagle",
    age: "1.5 years",
    gender: "female",
    size: "Medium",
    image: "images/beagle.png",
    fee: "$130",
    description: "Daisy is a sweet and curious Beagle with an incredible nose and an even bigger heart. She loves sniffing out adventures on walks and then coming home for belly rubs. Daisy is great with children and enjoys the company of other dogs.",
    traits: [
      { icon: "📏", label: "Size", value: "Medium" },
      { icon: "🎂", label: "Age", value: "1.5 Years" },
      { icon: "💉", label: "Vaccinated", value: "Yes" },
      { icon: "✂️", label: "Spayed", value: "Yes" },
      { icon: "🏠", label: "House Trained", value: "Yes" },
      { icon: "👃", label: "Special Skill", value: "Tracking" }
    ],
    tags: ["Curious", "Friendly", "Great with Kids", "Playful"]
  },
  {
    id: 8,
    name: "Cleo",
    type: "cat",
    breed: "Siamese",
    age: "2 years",
    gender: "female",
    size: "Medium",
    image: "images/siamese_cat.png",
    fee: "$120",
    description: "Cleo is an elegant Siamese cat with striking blue eyes and a vocal personality. She loves conversation — expect plenty of meows and purrs! Cleo is incredibly smart, loves puzzle toys, and forms deep bonds with her humans.",
    traits: [
      { icon: "📏", label: "Size", value: "Medium" },
      { icon: "🎂", label: "Age", value: "2 Years" },
      { icon: "💉", label: "Vaccinated", value: "Yes" },
      { icon: "✂️", label: "Spayed", value: "Yes" },
      { icon: "🧠", label: "Intelligence", value: "Very High" },
      { icon: "🗣️", label: "Vocal", value: "Yes" }
    ],
    tags: ["Elegant", "Smart", "Vocal", "Affectionate"]
  },
  {
    id: 9,
    name: "Raju",
    type: "dog",
    breed: "Indian Pariah Dog",
    age: "2 years",
    gender: "male",
    size: "Medium",
    image: "images/indian_pariah.png",
    fee: "₹500",
    description: "Raju is a handsome Indian Pariah Dog — one of the oldest and hardiest breeds in the world. He's incredibly loyal, street-smart, and adapts to any environment like a champ. Raju is low-maintenance, loves morning walks, and has the most expressive eyes that'll melt your heart. Desi dogs are the real MVPs!",
    traits: [
      { icon: "📏", label: "Size", value: "Medium" },
      { icon: "🎂", label: "Age", value: "2 Years" },
      { icon: "💉", label: "Vaccinated", value: "Yes" },
      { icon: "✂️", label: "Neutered", value: "Yes" },
      { icon: "💪", label: "Health", value: "Super Hardy" },
      { icon: "🌡️", label: "Climate", value: "All Weather" }
    ],
    tags: ["Loyal", "Low-Maintenance", "Street-Smart", "Desi"]
  },
  {
    id: 10,
    name: "Meera",
    type: "dog",
    breed: "Indian Spitz",
    age: "1 year",
    gender: "female",
    size: "Small",
    image: "images/indian_spitz.png",
    fee: "₹800",
    description: "Meera is an adorable Indian Spitz with a fluffy white coat and the most playful personality. She looks like a little cloud bouncing around! Meera is perfect for apartment living, loves to play fetch, and is incredibly smart — she already knows 'sit', 'shake', and 'roll over'. She's basically a professional cutie.",
    traits: [
      { icon: "📏", label: "Size", value: "Small" },
      { icon: "🎂", label: "Age", value: "1 Year" },
      { icon: "💉", label: "Vaccinated", value: "Yes" },
      { icon: "✂️", label: "Spayed", value: "Yes" },
      { icon: "🏠", label: "Apartment", value: "Friendly" },
      { icon: "🧠", label: "Tricks", value: "3 Learned" }
    ],
    tags: ["Fluffy", "Playful", "Apartment-Friendly", "Smart"]
  },
  {
    id: 11,
    name: "Simba",
    type: "cat",
    breed: "Indian Domestic Cat",
    age: "1.5 years",
    gender: "male",
    size: "Medium",
    image: "images/indie_cat.png",
    fee: "₹400",
    description: "Simba is a gorgeous Indie cat with striking tabby markings and golden-green eyes. He's the king of naps and the ruler of cardboard boxes. Simba is super chill during the day but turns into a playful goofball at night. He's been rescued from the streets and is ready to rule his forever home.",
    traits: [
      { icon: "📏", label: "Size", value: "Medium" },
      { icon: "🎂", label: "Age", value: "1.5 Years" },
      { icon: "💉", label: "Vaccinated", value: "Yes" },
      { icon: "✂️", label: "Neutered", value: "Yes" },
      { icon: "🐱", label: "Litter Trained", value: "Yes" },
      { icon: "👑", label: "Personality", value: "King Vibes" }
    ],
    tags: ["Rescued", "Indie", "Chill", "Playful Nights"]
  },
  {
    id: 12,
    name: "Chiku",
    type: "bird",
    breed: "Indian Ringneck Parakeet",
    age: "2 years",
    gender: "male",
    size: "Small",
    image: "images/indian_ringneck.png",
    fee: "₹600",
    description: "Chiku is a stunning Indian Ringneck Parakeet with vibrant green plumage and the signature rose ring around his neck. He's a total character — loves chatting, can mimic over 10 words, and dances when he hears Bollywood music. Chiku is hand-tamed and thrives on social interaction.",
    traits: [
      { icon: "📏", label: "Size", value: "Small" },
      { icon: "🎂", label: "Age", value: "2 Years" },
      { icon: "💉", label: "Health Check", value: "Passed" },
      { icon: "🗣️", label: "Vocabulary", value: "10+ Words" },
      { icon: "✋", label: "Hand Tamed", value: "Yes" },
      { icon: "🎵", label: "Loves", value: "Bollywood" }
    ],
    tags: ["Talkative", "Colorful", "Desi", "Bollywood Fan"]
  }
];

// ---- DOM Elements ----
const petGrid = document.getElementById('petGrid');
const filterTabs = document.querySelectorAll('.filter-tab');
const modal = document.getElementById('petModal');
const modalClose = document.getElementById('modalClose');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navbar = document.getElementById('navbar');
const testimonialTrack = document.getElementById('testimonialTrack');
const testimonialPrev = document.getElementById('testimonialPrev');
const testimonialNext = document.getElementById('testimonialNext');
const newsletterForm = document.getElementById('newsletterForm');

// ---- Render Pet Cards ----
function renderPets(filter = 'all') {
  const filtered = filter === 'all' ? pets : pets.filter(p => p.type === filter);
  
  petGrid.innerHTML = '';
  
  filtered.forEach((pet, index) => {
    const card = document.createElement('div');
    card.className = 'pet-card fade-in';
    card.style.transitionDelay = `${index * 0.08}s`;
    card.dataset.petId = pet.id;
    
    card.innerHTML = `
      <div class="pet-card-image">
        <img src="${pet.image}" alt="${pet.name} — ${pet.breed}" loading="lazy">
        <div class="pet-card-badge">${pet.type}</div>
        <div class="pet-card-favorite" onclick="event.stopPropagation(); this.classList.toggle('active')">♥</div>
      </div>
      <div class="pet-card-info">
        <div class="pet-card-header">
          <div class="pet-card-name">${pet.name}</div>
          <div class="pet-card-gender ${pet.gender}">
            ${pet.gender === 'male' ? '♂' : '♀'}
          </div>
        </div>
        <div class="pet-card-breed">${pet.breed}</div>
        <div class="pet-card-details">
          <div class="pet-card-detail">
            <span class="detail-icon">🎂</span> ${pet.age}
          </div>
          <div class="pet-card-detail">
            <span class="detail-icon">📏</span> ${pet.size}
          </div>
        </div>
        <button class="pet-card-btn" onclick="openModal(${pet.id})">
          Vibe with ${pet.name} <span>→</span>
        </button>
      </div>
    `;
    
    petGrid.appendChild(card);
  });

  // Trigger fade-in after a small delay
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.querySelectorAll('.pet-card.fade-in').forEach(card => {
        card.classList.add('visible');
      });
    });
  });
}

// ---- Filter Tabs ----
filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderPets(tab.dataset.filter);
  });
});

// ---- Modal ----
function openModal(petId) {
  const pet = pets.find(p => p.id === petId);
  if (!pet) return;

  document.getElementById('modalImage').src = pet.image;
  document.getElementById('modalImage').alt = `${pet.name} — ${pet.breed}`;
  document.getElementById('modalName').textContent = pet.name;
  document.getElementById('modalBreed').textContent = `${pet.breed} · ${pet.gender === 'male' ? '♂ Male' : '♀ Female'}`;
  document.getElementById('modalPrice').innerHTML = `${pet.fee} <span>adoption fee</span>`;
  document.getElementById('modalDescription').textContent = pet.description;

  // Tags
  const tagsContainer = document.getElementById('modalTags');
  tagsContainer.innerHTML = pet.tags.map(tag => `<span class="modal-tag">${tag}</span>`).join('');

  // Traits
  const traitsContainer = document.getElementById('modalTraits');
  traitsContainer.innerHTML = pet.traits.map(trait => `
    <div class="modal-trait">
      <div class="trait-icon">${trait.icon}</div>
      <div class="trait-label">${trait.label}</div>
      <div class="trait-value">${trait.value}</div>
    </div>
  `).join('');

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (adoptionOverlay && adoptionOverlay.classList.contains('active')) {
      closeAdoptionModal();
    } else if (authOverlay && authOverlay.classList.contains('active')) {
      closeAuthModal();
    } else {
      closeModal();
    }
  }
});

// ---- Scroll Animations (Intersection Observer) ----
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Don't unobserve pet cards (they re-render on filter)
      if (!entry.target.classList.contains('pet-card')) {
        scrollObserver.unobserve(entry.target);
      }
    }
  });
}, observerOptions);

function observeElements() {
  document.querySelectorAll('.fade-in').forEach(el => {
    scrollObserver.observe(el);
  });
}

// ---- Animated Stat Counters ----
let statsAnimated = false;

function animateStats() {
  if (statsAnimated) return;
  
  const statNumbers = document.querySelectorAll('.stat-number');
  const statsSection = document.getElementById('stats');
  
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        statNumbers.forEach(num => {
          const target = parseInt(num.dataset.target);
          let current = 0;
          const increment = target / 60;
          const duration = 2000;
          const stepTime = duration / 60;
          
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            num.textContent = Math.floor(current).toLocaleString() + '+';
          }, stepTime);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  statsObserver.observe(statsSection);
}

// ---- Navbar Scroll Effect ----
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ---- Mobile Menu ----
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ---- Testimonial Carousel ----
let testimonialIndex = 0;

function updateTestimonialPosition() {
  if (!testimonialTrack) return;
  const cards = testimonialTrack.querySelectorAll('.testimonial-card');
  if (cards.length === 0) return;
  
  const cardWidth = cards[0].offsetWidth + 24; // card width + gap
  const maxIndex = Math.max(0, cards.length - Math.floor(testimonialTrack.parentElement.offsetWidth / cardWidth));
  
  testimonialIndex = Math.max(0, Math.min(testimonialIndex, maxIndex));
  testimonialTrack.style.transform = `translateX(-${testimonialIndex * cardWidth}px)`;
}

if (testimonialPrev) {
  testimonialPrev.addEventListener('click', () => {
    testimonialIndex--;
    updateTestimonialPosition();
  });
}

if (testimonialNext) {
  testimonialNext.addEventListener('click', () => {
    testimonialIndex++;
    updateTestimonialPosition();
  });
}

// Auto-scroll testimonials
let autoScrollInterval = setInterval(() => {
  const cards = testimonialTrack ? testimonialTrack.querySelectorAll('.testimonial-card') : [];
  const maxIndex = Math.max(0, cards.length - 1);
  
  testimonialIndex++;
  if (testimonialIndex > maxIndex) testimonialIndex = 0;
  updateTestimonialPosition();
}, 5000);

// Pause auto-scroll on hover
if (testimonialTrack) {
  testimonialTrack.parentElement.addEventListener('mouseenter', () => {
    clearInterval(autoScrollInterval);
  });
  
  testimonialTrack.parentElement.addEventListener('mouseleave', () => {
    autoScrollInterval = setInterval(() => {
      const cards = testimonialTrack.querySelectorAll('.testimonial-card');
      const maxIndex = Math.max(0, cards.length - 1);
      testimonialIndex++;
      if (testimonialIndex > maxIndex) testimonialIndex = 0;
      updateTestimonialPosition();
    }, 5000);
  });
}

// ============================================
// AUTH MODAL (Login / Signup)
// ============================================
let isLoggedIn = false;
let currentUser = null;
let adoptingPetId = null;

// API base URL — change this if server runs on a different port
const API_BASE = window.location.protocol === 'file:' ? 'http://localhost:3000' : '';

const authOverlay = document.getElementById('authOverlay');
const authClose = document.getElementById('authClose');
const tabLogin = document.getElementById('tabLogin');
const tabSignup = document.getElementById('tabSignup');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const authTitle = document.getElementById('authTitle');
const authSubtitle = document.getElementById('authSubtitle');

function openAuthModal() {
  authOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
  authOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

authClose.addEventListener('click', closeAuthModal);
authOverlay.addEventListener('click', (e) => {
  if (e.target === authOverlay) closeAuthModal();
});

// Tab switching
tabLogin.addEventListener('click', () => {
  tabLogin.classList.add('active');
  tabSignup.classList.remove('active');
  loginForm.style.display = 'flex';
  signupForm.style.display = 'none';
  authTitle.textContent = 'Welcome Back';
  authSubtitle.textContent = 'Sign in to start the adoption process';
});

tabSignup.addEventListener('click', () => {
  tabSignup.classList.add('active');
  tabLogin.classList.remove('active');
  signupForm.style.display = 'flex';
  loginForm.style.display = 'none';
  authTitle.textContent = 'Create Account';
  authSubtitle.textContent = 'Join PawFinder to adopt your new best friend';
});

// Login form submit
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const btn = loginForm.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = 'Signing in...';
  btn.disabled = true;
  
  try {
    const res = await fetch(`${API_BASE}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    
    isLoggedIn = true;
    currentUser = data.user;
    console.log('✅ Logged in:', currentUser.email);
  } catch (err) {
    console.warn('API login failed, using local mode:', err.message);
    isLoggedIn = true;
    currentUser = { email, name: email.split('@')[0] };
  }
  
  btn.textContent = originalText;
  btn.disabled = false;
  closeAuthModal();
  
  if (adoptingPetId) {
    setTimeout(() => openAdoptionModal(adoptingPetId), 300);
  }
});

// Signup form submit
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const firstName = document.getElementById('signupFirst').value;
  const lastName = document.getElementById('signupLast').value;
  const email = document.getElementById('signupEmail').value;
  const phone = document.getElementById('signupPhone').value;
  const password = document.getElementById('signupPassword').value;
  const btn = signupForm.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = 'Creating account...';
  btn.disabled = true;
  
  try {
    const res = await fetch(`${API_BASE}/api/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, phone, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Signup failed');
    
    isLoggedIn = true;
    currentUser = data.user;
    console.log('✅ Account created:', currentUser.email);
  } catch (err) {
    console.warn('API signup failed, using local mode:', err.message);
    isLoggedIn = true;
    currentUser = { email, name: `${firstName} ${lastName}`, firstName, lastName };
  }
  
  btn.textContent = originalText;
  btn.disabled = false;
  closeAuthModal();
  
  if (adoptingPetId) {
    setTimeout(() => openAdoptionModal(adoptingPetId), 300);
  }
});

// Google "login" (simulated)
document.getElementById('googleLoginBtn').addEventListener('click', () => {
  isLoggedIn = true;
  currentUser = { email: 'user@gmail.com', name: 'Google User' };
  closeAuthModal();
  
  if (adoptingPetId) {
    setTimeout(() => openAdoptionModal(adoptingPetId), 300);
  }
});

// ============================================
// ADOPTION FORM MODAL
// ============================================
const adoptionOverlay = document.getElementById('adoptionOverlay');
const adoptionClose = document.getElementById('adoptionClose');
const adoptionForm = document.getElementById('adoptionForm');
let currentStep = 1;

function openAdoptionModal(petId) {
  const pet = pets.find(p => p.id === petId);
  if (!pet) return;

  // Set pet info in header
  document.getElementById('adoptionPetImg').src = pet.image;
  document.getElementById('adoptionPetImg').alt = pet.name;
  document.getElementById('adoptionPetName').textContent = pet.name;
  document.getElementById('adoptionPetDetail').textContent = `${pet.breed} · ${pet.fee} adoption fee`;

  // Pre-fill email if we have user data
  if (currentUser) {
    const emailField = document.getElementById('adopterEmail');
    if (emailField && currentUser.email) emailField.value = currentUser.email;
    if (currentUser.firstName) {
      const fnField = document.getElementById('adopterFirstName');
      if (fnField) fnField.value = currentUser.firstName;
    }
    if (currentUser.lastName) {
      const lnField = document.getElementById('adopterLastName');
      if (lnField) lnField.value = currentUser.lastName;
    }
  }

  // Reset form to step 1
  currentStep = 1;
  updateStepper();
  showFormStep(1);

  // Show form, hide success
  adoptionForm.style.display = 'flex';
  document.getElementById('adoptionSuccess').classList.remove('active');

  // Reset header visibility
  document.querySelector('.adoption-header').style.display = '';

  adoptionOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeAdoptionModal() {
  adoptionOverlay.classList.remove('active');
  document.body.style.overflow = '';
  adoptingPetId = null;
}

adoptionClose.addEventListener('click', closeAdoptionModal);
adoptionOverlay.addEventListener('click', (e) => {
  if (e.target === adoptionOverlay) closeAdoptionModal();
});

// Step navigation
function showFormStep(step) {
  document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
  const target = document.querySelector(`.form-step[data-step="${step}"]`);
  if (target) target.classList.add('active');
  
  // Scroll modal to top
  const adoptionModal = document.querySelector('.adoption-modal');
  if (adoptionModal) adoptionModal.scrollTop = 0;
}

function updateStepper() {
  const circles = document.querySelectorAll('.step-circle');
  const lines = [document.getElementById('line1'), document.getElementById('line2')];
  const labels = document.querySelectorAll('.stepper-label');

  circles.forEach((circle, i) => {
    const step = i + 1;
    circle.classList.remove('active', 'completed');
    if (step < currentStep) {
      circle.classList.add('completed');
      circle.textContent = '✓';
    } else if (step === currentStep) {
      circle.classList.add('active');
      circle.textContent = step;
    } else {
      circle.textContent = step;
    }
  });

  lines.forEach((line, i) => {
    if (line) {
      line.classList.toggle('completed', i + 1 < currentStep);
    }
  });

  labels.forEach((label, i) => {
    label.classList.toggle('active', i + 1 === currentStep);
  });
}

function nextStep(step) {
  // Validate current step's required fields
  const currentStepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
  const requiredFields = currentStepEl.querySelectorAll('[required]');
  let valid = true;

  requiredFields.forEach(field => {
    if (!field.value && field.type !== 'radio') {
      field.style.borderColor = '#ef4444';
      valid = false;
      setTimeout(() => { field.style.borderColor = ''; }, 2000);
    }
  });

  // Check radio groups in current step
  const radioGroups = currentStepEl.querySelectorAll('.radio-group');
  radioGroups.forEach(group => {
    const radios = group.querySelectorAll('input[type="radio"]');
    if (radios.length > 0 && radios[0].required) {
      const anyChecked = Array.from(radios).some(r => r.checked);
      if (!anyChecked) {
        valid = false;
        group.querySelectorAll('label').forEach(l => {
          l.style.borderColor = '#ef4444';
          setTimeout(() => { l.style.borderColor = ''; }, 2000);
        });
      }
    }
  });

  if (!valid) return;

  currentStep = step;
  updateStepper();
  showFormStep(step);
}

function prevStep(step) {
  currentStep = step;
  updateStepper();
  showFormStep(step);
}

// Form submission
adoptionForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Gather all form data
  const pet = pets.find(p => p.id === adoptingPetId);
  const adoptionData = {
    petId: adoptingPetId,
    petName: pet ? pet.name : 'Unknown',
    userId: currentUser?._id || null,
    // Step 1
    firstName: document.getElementById('adopterFirstName').value,
    lastName: document.getElementById('adopterLastName').value,
    email: document.getElementById('adopterEmail').value,
    phone: document.getElementById('adopterPhone').value,
    address: document.getElementById('adopterAddress').value,
    age: parseInt(document.getElementById('adopterAge').value),
    occupation: document.getElementById('adopterOccupation').value || '',
    // Step 2
    housing: document.querySelector('input[name="housing"]:checked')?.value || 'house',
    ownership: document.querySelector('input[name="ownership"]:checked')?.value || 'own',
    hasYard: document.querySelector('input[name="yard"]:checked')?.value || '',
    numAdults: parseInt(document.getElementById('numAdults').value) || 1,
    numChildren: parseInt(document.getElementById('numChildren').value) || 0,
    childrenAges: document.getElementById('childrenAges').value || '',
    // Step 3
    hasPetExperience: document.querySelector('input[name="petExp"]:checked')?.value || 'no',
    currentPets: document.getElementById('currentPets').value || '',
    hoursAlone: document.getElementById('hoursAlone').value || '',
    vetName: document.getElementById('vetName').value || '',
    referenceName: document.getElementById('referenceName').value,
    referencePhone: document.getElementById('referencePhone').value,
    whyAdopt: document.getElementById('whyAdopt').value
  };
  
  // Try to save to backend
  try {
    const res = await fetch(`${API_BASE}/api/adoptions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(adoptionData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Submission failed');
    console.log('✅ Adoption application saved to MongoDB:', data.adoption._id);
  } catch (err) {
    console.warn('API adoption submit failed (data not saved to DB):', err.message);
  }
  
  // Hide form, show success regardless
  adoptionForm.style.display = 'none';
  document.getElementById('adoptionSuccess').classList.add('active');
  document.querySelector('.adoption-header').style.display = 'none';
});

// ============================================
// WIRING: "Start Adoption" → Auth check → Adoption Form
// ============================================
function handleAdoptClick(petId) {
  adoptingPetId = petId;
  
  if (!isLoggedIn) {
    // Close pet detail modal first, then open auth
    closeModal();
    setTimeout(() => openAuthModal(), 300);
  } else {
    // Already logged in — go straight to adoption form
    closeModal();
    setTimeout(() => openAdoptionModal(petId), 300);
  }
}

// ---- Newsletter Form ----
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletterEmail');
    
    if (email && email.value) {
      const btn = newsletterForm.querySelector('button');
      const originalText = btn.textContent;
      btn.textContent = '✓ You\'re In!';
      btn.style.background = 'linear-gradient(135deg, #14b8a6, #0d9488)';
      email.value = '';
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
      }, 3000);
    }
  });
}

// ---- Initialize ----
document.addEventListener('DOMContentLoaded', () => {
  renderPets();
  observeElements();
  animateStats();

  // ---- Theme Toggle ----
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const savedTheme = localStorage.getItem('pawfinder-theme') || 'dark';
  
  document.body.setAttribute('data-theme', savedTheme);
  if (themeIcon) themeIcon.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.body.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.body.setAttribute('data-theme', next);
      localStorage.setItem('pawfinder-theme', next);
      if (themeIcon) themeIcon.textContent = next === 'dark' ? '🌙' : '☀️';
    });
  }

  // Wire up the adopt button in pet detail modal
  const adoptBtn = document.getElementById('modalAdoptBtn');
  if (adoptBtn) {
    adoptBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const petName = document.getElementById('modalName').textContent;
      const pet = pets.find(p => p.name === petName);
      if (pet) handleAdoptClick(pet.id);
    });
  }

  // Wire up "Adopt Now" nav link
  const navCta = document.querySelector('.nav-cta');
  if (navCta) {
    navCta.addEventListener('click', (e) => {
      e.preventDefault();
      if (!isLoggedIn) {
        adoptingPetId = null;
        openAuthModal();
      } else {
        document.getElementById('pets').scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ---- Donate Pet Modal ----
  const donateOverlay = document.getElementById('donateOverlay');
  const donateClose = document.getElementById('donateClose');
  const openDonateBtn = document.getElementById('openDonateModal');
  const donateForm = document.getElementById('donateForm');
  const donateSuccess = document.getElementById('donateSuccess');

  function openDonateModal() {
    if (donateOverlay) {
      donateOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      // Reset form to fresh state
      if (donateForm) donateForm.style.display = 'flex';
      if (donateSuccess) donateSuccess.classList.remove('active');
    }
  }

  window.closeDonateModal = function() {
    if (donateOverlay) {
      donateOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (openDonateBtn) openDonateBtn.addEventListener('click', openDonateModal);
  if (donateClose) donateClose.addEventListener('click', window.closeDonateModal);
  if (donateOverlay) {
    donateOverlay.addEventListener('click', (e) => {
      if (e.target === donateOverlay) window.closeDonateModal();
    });
  }

  if (donateForm) {
    donateForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const petData = {
        name: document.getElementById('donatePetName').value,
        type: document.getElementById('donatePetType').value,
        breed: document.getElementById('donatePetBreed').value,
        age: document.getElementById('donatePetAge').value,
        gender: document.querySelector('input[name="donateGender"]:checked')?.value || 'male',
        size: document.getElementById('donatePetSize').value,
        description: document.getElementById('donatePetDesc').value,
        fee: 'Free',
        image: '',
        traits: [],
        tags: ['Rehomed', 'Verified'],
        ownerName: document.getElementById('donateOwnerName').value,
        ownerPhone: document.getElementById('donateOwnerPhone').value,
        ownerCity: document.getElementById('donateOwnerCity').value
      };

      // Try saving to backend
      try {
        const res = await fetch(`${API_BASE}/api/pets`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(petData)
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        console.log('✅ Pet listed for rehoming:', data.pet.name);
      } catch (err) {
        console.warn('API pet submit failed:', err.message);
      }

      // Show success
      donateForm.style.display = 'none';
      if (donateSuccess) donateSuccess.classList.add('active');
    });
  }
});
