const mongoose=require('mongoose');
const otpSchema=new mongoose.Schema({
    email:{
        type:String,            
        required:true

    },
    otp:{
        type:String,        
        required:true
    },
     action:{
        type:String,
        enum:['account_verification','event_registration','event_booking'],
        required:true
     },
   createdAt:{
    type:Date,
    default:Date.now
},
expiresAt:{
    type:Date,
    default:() => new Date(Date.now() + 5 * 60 * 1000)
}
});
module.exports=mongoose.model('OTP',otpSchema);
