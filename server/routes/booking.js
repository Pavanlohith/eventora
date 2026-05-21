const express = require('express');
const router = express.Router();
const Booking = require('../models/bookings');
const {protect,admin}=require('../middleware/auth');
const {bookEvent,sendBookingOTP,getMyBookings,confirmBooking,cancelBooking}=require('../controllers/bookingcontroller');    
router.post('/',protect,bookEvent);
router.post('/send-otp',protect,sendBookingOTP);

router.get('/my',protect,getMyBookings);
router.put('/:id/confirm',protect,confirmBooking);
router.delete('/:id',protect,admin,cancelBooking);
router.get('/', protect, admin, async (req, res) => {
    const bookings = await Booking.find()
        .populate('userId')
        .populate('eventId');

    res.json(bookings);
});
module.exports=router;