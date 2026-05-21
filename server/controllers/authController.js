const userModel=require('../models/user');
const { sendOTPEmail } = require('../utils/email');
const OTP=require('../models/otp');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const generateToken=(id,role)=>{
    return jwt.sign({id,role},process.env.JWT_SECRET,{expiresIn:'7d'});
}

exports.registerUser=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
     
        const existingUser=await userModel.findOne({email});        
        if(existingUser){
            return res.status(400).json({message:'User already exists'});
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
       
        const newUser=new userModel({
            name,
            email,      
            password:hashedPassword,
           
            
        });
        await newUser.save();
 
       const otp=Math.floor(100000+Math.random()*900000).toString();
      
     console.log(`OTP for ${email}: ${otp}`);
     await OTP.create({email,otp,action:'account_verification'});     
     await sendOTPEmail(email, otp,'account_verification');
       
        res.status(201).json({message:'User registered successfully'
            ,email:newUser.email
        });
            

       
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({message:'Internal server error'});
    }   
};
// 
// exports.loginUser=async(req,res)=>{
//     try {
//         const {email,password}=req.body;
//         const user=await userModel.findOne({email});
//         if(!user){
//             return res.status(400).json({message:'Invalid email or password'});
//         }       
//         const isMatch=await bcrypt.compare(password,user.password);
//         if(!isMatch){
//             return res.status(400).json({message:'Invalid email or password'});
//         }
//         if(!user.isVerified && user.role==='user'){
//         const otp=Math.floor(100000+Math.random()*900000).toString();
//         console.log(`OTP for ${email}: ${otp}`);
//        await OTP.deleteMany({email,action:'account_verification'});
//         await OTP.create({email,otp,action:'account_verification'});     
//         await sendOTPEmail(email, otp,'account_verification');
//         return res.status(400).json({message:'Account not verified. OTP sent to email for verification.'});  
//         }
//         res.status(200).json({message:'Login successful',
//             _id:user._id,
//             name:user.name,
//             email:user.email,
//             role:user.role,
//             token:generateToken(user._id,user.role)
//         });
//     }
//     catch (error) {
//         console.error('Error logging in user:', error);
//         res.status(500).json({message:'Internal server error'});
//     }   
// };
//login use
exports.loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body;

        const user=await userModel.findOne({email});

        if(!user){
            return res.status(400).json({
                message:'Invalid email or password'
            });
        }

        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({
                message:'Invalid email or password'
            });
        }

        res.status(200).json({
            message:'Login successful',
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            token:generateToken(user._id,user.role)
        });

    }
    catch (error) {
        console.error('Error logging in user:', error);

        res.status(500).json({
            message:'Internal server error'
        });
    }
};
// exports.verifyotp=async(req,res)=>{
//     try {
//         const {email,otp}=req.body;         
//         const record=await OTP.findOne({email,otp,action:'account_verification'});
//         if(!record){
//             return res.status(400).json({message:'Invalid or expired OTP'});
//         }   
//         await userModel.findOneAndUpdate({email},{isVerified:true});
//         await OTP.deleteMany({email,action:'account_verification'});
//         res.status(200).json({message:'Account verified successfully'
//             ,
//             _id:user._id,
//             name:user.name,
//             email:user.email,
//             role:user.role,
//             token:generateToken(user._id,'user')
//         });
//     }   catch (error) {
//         console.error('Error verifying OTP:', error);
//         res.status(500).json({message:'Internal server error'});
//     }           
// };  
exports.verifyotp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const record = await OTP.findOne({
            email,
            otp,
            action: 'account_verification'
        });

        if (!record) {
            return res.status(400).json({
                message: 'Invalid or expired OTP'
            });
        }

        const user = await userModel.findOneAndUpdate(
            { email },
            { isVerified: true },
            { new: true }
        );

        await OTP.deleteMany({
            email,
            action: 'account_verification'
        });

        res.status(200).json({
            message: 'Account verified successfully',
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role)
        });

    } catch (error) {
        console.error('Error verifying OTP:', error);

        res.status(500).json({
            message: 'Internal server error'
        });
    }
};
