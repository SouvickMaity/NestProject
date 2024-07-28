const JWT= require ("jsonwebtoken");
//import JWT from "jsonwebtoken";
const userModel= require( "../models/userModel");


// protect token
  module.exports.requireSignIn = async(req,res,next)=>{
  // .split(' ')[1];
  //       console.log("token:",token);
  
  try {
    const token = req.headers.authorization;
    console.log(token);
    const decode = JWT.verify(token, process.env.JWT_SECRET);
    
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
     res.status(401).send({
      success: false,
      message: "Invalid token",
    });
  }

};
// admin access

// admin access
 module.exports. isAdmin=async(req,res,next)=>{
   try{
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in admin middelware",
      error: error.message,
    });
  }
};



