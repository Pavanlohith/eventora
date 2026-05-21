//  const Booking=require('../models/bookings');
//  const OTP=require('../models/otp');
// const Event=require('../models/Events');
// const {sendOTPEmail,sendBookingEmail}=require('../utils/email');
// const generateotp=()=>{
//     return Math.floor(100000 + Math.random() * 900000).toString();
// }
// exports.sendBookingOTP=async(req,res)=>{

//     const otp=generateotp();
//     await OTP.findOneAndDelete({email:req.user.email,action:'event_booking'});
//     await OTP.create({email:req.user.email,otp,action:'event_booking',expiresAt:Date.now()+5*60*1000});
//     await sendOTPEmail(req.user.email,otp,'event_registration');
//     res.status(200).json({message:'OTP sent to your email'});   


// }

// exports.bookEvent=async(req,res)=>{
   
  
//     const {eventId,otp}=req.body;
//     const otpRecord=await OTP.findOne({email:req.user.email,action:'event_booking'});
//     if(!otpRecord || otpRecord.otp!==otp || otpRecord.expiresAt<Date.now()){
//         return res.status(400).json({message:'Invalid or expired OTP'});
//     }
//     const event=await Event.findById(eventId);
//     if(!event){
//         return res.status(404).json({message:'Event not found'});
//     }
//     if(event.availableSeats<=0){
//         return res.status(400).json({message:'No seats available'});
//     }
//     const existingBooking=await Booking.findOne({userId:req.user._id,eventId});
//     if(existingBooking){
//         return res.status(400).json({message:'You have already booked this event'});
//     }
//     const booking=new Booking({
//         userId:req.user._id,
//         eventId,
//         status:'pending',
//         paymentStatus:'not_paid',
//         amount:event.ticketPrice
//     });
//     await OTP.deleteMany({email:req.user.email,action:'event_booking'});
//     await booking.save();
//     res.status(201).json({message:'Event booked successfully',booking});

// }   
    
// exports.confirmBooking=async(req,res)=>{
//  const paymentStatus=req.body.paymentStatus;
//  if(!['paid','non_paid'].includes(paymentStatus)){
//     return res.status(400).json({message:'Invalid payment status'});
//  }
//     const booking=await Booking.findById(req.params.id).populate('eventId').populate('userId');

//     if(!booking){
//         return res.status(404).json({message:'Booking not found'});
//     }
//    if(booking.status=='confirmed'){
//     return res.status(400).json({message:'Booking already confirmed'});
//    }
//    const event=booking.eventId;
//    if(event.availableSeats<=0){
//     return res.status(400).json({message:'No seats available'});
//    }
//    booking.status='confirmed';
//    if(paymentStatus){
//     booking.paymentStatus=paymentStatus;
//    }

//    await booking.save();
//     event.availableSeats-=1;
//     await event.save();
//     await sendBookingEmail(booking.userId.email,booking.userId.name,event.title);
//    res.status(200).json({message:'Booking confirmed successfully',booking});
// }
// exports.getMyBookings=async(req,res)=>{
//     const bookings=await Booking.find({userId:req.user._id}).populate('eventId');
//     res.status(200).json({bookings});
// }   
// exports.cancelBooking=async(req,res)=>{ 
//     const booking=await Booking.findById(req.params.id);    
//     if(!booking){   
//         return res.status(404).json({message:'Booking not found'});
//     }       
//     if(booking.status=='cancelled'){
//         return res.status(400).json({message:'Booking already cancelled'});
//     }   
//     booking.status='cancelled';                 
//     await booking.save();

//     const event=booking.eventId;        
//     event.availableSeats+=1;    
//     await event.save(); 
//     res.status(200).json({message:'Booking cancelled successfully'});
// }

const Booking=require('../models/bookings');
const OTP=require('../models/otp');
const Event=require('../models/Events');
const {sendOTPEmail,sendBookingEmail}=require('../utils/email');

const generateotp=()=>{
    return Math.floor(100000 + Math.random() * 900000).toString();
}

exports.sendBookingOTP=async(req,res)=>{

    const otp=generateotp();
    console.log("Generated OTP:", otp);  
    await OTP.findOneAndDelete({email:req.user.email,action:'event_booking'});

    await OTP.create({
        email:req.user.email,
        otp,
        action:'event_booking',
        expiresAt:new Date(Date.now()+5*60*1000)
    });

    await sendOTPEmail(req.user.email,otp,'event_booking');

    res.status(200).json({message:'OTP sent to your email'});   
}

exports.bookEvent=async(req,res)=>{
   
    const {eventId,otp}=req.body;

    const otpRecord=await OTP.findOne({
        email:req.user.email,
        action:'event_booking'
    });

    if(!otpRecord || otpRecord.otp!==otp || otpRecord.expiresAt < new Date()){
        return res.status(400).json({message:'Invalid or expired OTP'});
    }

    const event=await Event.findById(eventId);
    if(!event){
        return res.status(404).json({message:'Event not found'});
    }

    if(event.availableSeats<=0){
        return res.status(400).json({message:'No seats available'});
    }

    const existingBooking=await Booking.findOne({
        userId:req.user._id,
        eventId
    });

    if(existingBooking){
        return res.status(400).json({message:'You have already booked this event'});
    }

    const booking=new Booking({
        userId:req.user._id,
        eventId,
        status:'pending',
        paymentStatus:'not_paid',
        amount:event.ticketPrice
    });

    await OTP.deleteMany({
        email:req.user.email,
        action:'event_booking'
    });

    await booking.save();

    res.status(201).json({message:'Event booked successfully',booking});
}   

exports.confirmBooking=async(req,res)=>{

    const paymentStatus=req.body.paymentStatus;

    if(!['paid','not_paid'].includes(paymentStatus)){
        return res.status(400).json({message:'Invalid payment status'});
    }

    const booking=await Booking.findById(req.params.id)
        .populate('eventId')
        .populate('userId');

    if(!booking){
        return res.status(404).json({message:'Booking not found'});
    }

    if(booking.status=='confirmed'){
        return res.status(400).json({message:'Booking already confirmed'});
    }

    const event=booking.eventId;

    if(event.availableSeats<=0){
        return res.status(400).json({message:'No seats available'});
    }

    booking.status='confirmed';
    booking.paymentStatus=paymentStatus;

    await booking.save();

    event.availableSeats-=1;
    await event.save();

    await sendBookingEmail(
        booking.userId.email,
        booking.userId.name,
        event.title
    );

    res.status(200).json({message:'Booking confirmed successfully',booking});
}

exports.getMyBookings=async(req,res)=>{
    const bookings=await Booking.find({userId:req.user._id}).populate('eventId');
    res.status(200).json({bookings});
}   

exports.cancelBooking=async(req,res)=>{ 

    const booking=await Booking.findById(req.params.id).populate('eventId');    

    if(!booking){   
        return res.status(404).json({message:'Booking not found'});
    }       

    if(booking.status=='cancelled'){
        return res.status(400).json({message:'Booking already cancelled'});
    }   

    booking.status='cancelled';                 
    await booking.save();

    const event=booking.eventId;        
    event.availableSeats+=1;    
    await event.save(); 

    res.status(200).json({message:'Booking cancelled successfully'});
}