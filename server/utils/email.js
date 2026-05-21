const nodeMailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();
const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {     
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
exports.sendBookingEmail=async(userEmail,userName,eventTitle)=>{
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: 'Event Booking Confirmation',
            text: `Dear ${userName},\n\nYour booking for the event "${eventTitle}" has been confirmed. We look forward to seeing you there!\n\nBest regards,\nEventora Team`
        };
        await transporter.sendMail(mailOptions);
        console.log(`Booking confirmation email sent to ${userEmail}`);
    }   catch (error) { 
        console.error(`Error sending booking confirmation email to ${userEmail}:`, error);
            
    }   
}
exports.sendOTPEmail = async (email, otp,type) => {
    const title = type === 'account_verification' ? 'Account Verification' : 'Event Registration';      
      const message = type === 'account_verification'
        ? `Your OTP for verifying your account on Eventora is: ${otp}. It is valid for 5 minutes.`
        : `Your OTP for registering for the event on Eventora is: ${otp}. It is valid for 5 minutes.`;  

    const mailOptions = {
        from: process.env.EMAIL_USER,           
        to: email,
        subject: 'Your OTP for Eventora',
        text: `Your OTP for Eventora is: ${otp}. It is valid for 5 minutes.`
    };  
    try {
        await transporter.sendMail(mailOptions);
        console.log(`OTP email sent to ${email}`);
    }
    catch (error) {
        console.error(`Error sending OTP email to ${email}:`, error);
    }
};
