// // const express = require('express');
// // const cors = require('cors');
// // const dotenv = require('dotenv');
// // const mongoose = require('mongoose');
// // const authRoutes = require('./routes/auth');
// // const eventRoutes=require('./routes/event');
// // const bookingRoutes=require('./routes/booking');

// // dotenv.config();




// // const app = express();
// // app.use(cors());
// // //routes
// // app.use('/api/auth',authRoutes)
// // app.use('/api/auth',authRoutes  )
// //  app.use('/api/events',require('./routes/events'));
// //  app.use('/api/bookings',require('./routes/bookings'));   
// // app.use(express.json());    
// // mongoose.connect(process.env.MONGO_URI, {
      
// // }).then(() => {
// //     console.log('Connected to MongoDB');
// // }   
// // ).catch((error) => {
// //     console.error('Error connecting to MongoDB:', error);
// // });         




// // const PORT=process.env.PORT || 5000 ;
// // app.listen (PORT,()=>{
// //     console.log(`Server is running on port ${PORT}`);
// // });
// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const mongoose = require('mongoose');

// const authRoutes = require('./routes/auth');
// const eventRoutes = require('./routes/event');
// const bookingRoutes = require('./routes/booking');

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/events', eventRoutes);
// app.use('/api/bookings', bookingRoutes);

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI)
// .then(() => {
//     console.log('Connected to MongoDB');
// })
// .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
// });
// mongoose.connect(process.env.MONGO_URI)
// .then(() => {
//     console.log('Connected to MongoDB');
//     console.log('DB NAME:', mongoose.connection.name);
// })
// // Server
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/event');
const bookingRoutes = require('./routes/booking');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB');
    console.log('DB NAME:', mongoose.connection.name);
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});