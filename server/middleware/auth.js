const jwt=require('jsonwebtoken');
const userModel=require('../models/user');  
 const protect=async(req,res,next)=>{
    let token=req.headers.authorization && req.headers.authorization.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : null  ;  
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            req.user=await userModel.findById(decoded.id).select('-password');
            if(!req.user){
                return res.status(401).json({message:'Not authorized, user not found'});
            }   
            next();
        }   
        catch (error) {
            console.error('Error in auth middleware:', error);
            res.status(401).json({message:'Not authorized, token failed'});
        }
                
    }
    if(!token){
        res.status(401).json({message:'Not authorized, no token'});
    }
}

const admin=async(req,res,next)=>{          
    if(req.user && req.user.role==='admin'){
        next();

    }
    else{
        res.status(403).json({message:'Forbidden, admin only'});
    }
}
module.exports={protect,admin};
