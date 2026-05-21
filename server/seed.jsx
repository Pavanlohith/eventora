const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Event = require('./models/Events');
const User = require('./models/user');

dotenv.config();

const events = [
  ['React & Node.js Developer Retreat', 'Technology', 'Bangalore', 700, 'https://images.unsplash.com/photo-1515187029135-18ee286d815b'],
  ['Neon Nights EDM Festival', 'Music', 'Chennai', 999, 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a'],
  ['Global Leaders Business Summit', 'Business', 'Hyderabad', 1200, 'https://images.unsplash.com/photo-1511578314322-379afb476865'],
  ['Startup Pitch Fest 2026', 'Business', 'Mumbai', 500, 'https://images.unsplash.com/photo-1556761175-b413da4baf72'],
  ['AI & Machine Learning Workshop', 'Technology', 'Pune', 850, 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b'],
  ['Food Carnival Weekend', 'Food', 'Delhi', 300, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836'],
  ['Standup Comedy Night', 'Entertainment', 'Chennai', 399, 'https://images.unsplash.com/photo-1527224857830-43a7acc85260'],
  ['Digital Marketing Bootcamp', 'Education', 'Bangalore', 600, 'https://images.unsplash.com/photo-1460925895917-afdab827c52f'],
  ['Photography Walk', 'Art', 'Kochi', 250, 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee'],
  ['Fitness Marathon Challenge', 'Sports', 'Hyderabad', 350, 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5'],
  ['College Cultural Fest', 'Entertainment', 'Coimbatore', 450, 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30'],
  ['Cyber Security Seminar', 'Technology', 'Chennai', 750, 'https://images.unsplash.com/photo-1555949963-aa79dcee981c'],
  ['Yoga & Wellness Camp', 'Health', 'Mysore', 400, 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b'],
  ['Robotics Expo 2026', 'Technology', 'Bangalore', 650, 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e'],
  ['Book Fair Festival', 'Education', 'Delhi', 200, 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f'],
  ['Fashion Design Showcase', 'Fashion', 'Mumbai', 900, 'https://images.unsplash.com/photo-1483985988355-763728e1935b'],
  ['Cricket Fan Meetup', 'Sports', 'Chennai', 300, 'https://images.unsplash.com/photo-1531415074968-036ba1b575da'],
  ['Film Making Masterclass', 'Art', 'Hyderabad', 800, 'https://images.unsplash.com/photo-1485846234645-a62644f84728'],
  ['Gaming Tournament', 'Gaming', 'Bangalore', 500, 'https://images.unsplash.com/photo-1542751371-adc38448a05e'],
  ['Hackathon 24 Hours', 'Technology', 'Pune', 1000, 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d'],
];

const seedEvents = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const admin = await User.findOne({ role: 'admin' });

    if (!admin) {
      console.log('No admin found. Create admin first.');
      process.exit();
    }

    await Event.deleteMany({});

    const finalEvents = events.map((e, index) => ({
      title: e[0],
      category: e[1],
      location: e[2],
      ticketPrice: e[3],
      imageUrl: e[4],
      description: `${e[0]} is an exciting event designed for students, professionals, and enthusiasts.`,
      date: new Date(2026, 5, index + 1),
      totalSeats: 100 + index * 10,
      availableSeats: 100 + index * 10,
      createdBy: admin._id
    }));

    await Event.insertMany(finalEvents);

    console.log('20 events seeded successfully');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedEvents();