
const express = require("express");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
const userMode=require("../models/userModel");
const JWT=require("jsonwebtoken");


module.exports.registerController= async(req,res )=>{
    try{
        const {name,email,password,phone,address,answer}=req.body;
       
       if(!name){
        return res.send({message:"name is require"});
       }
       if(!email){ 
        return res.send({message:"email is require"});
       }
       if(!password){
        return res.send({message:"password is require"});
       }
       if(!phone){
        return res.send({message:"phone is require"});
       }
       if(!answer){
        return res.send({message:"answer is require"});
       }

       // existing user
       const existuser= await userModel.findOne({email})
       if(existuser){
        return res.status(200).send({
            success:false,
            message:"user already exist"
        });
       }

       //register user

       const hashpassword= await hashPassword(password);
       const user=await new userModel({name,email,password:hashpassword,phone,address,answer}).save();
       res.status(201).send({
        success:true,
        message:"user register successfully",
        user,
       });

    } catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in registration"
        });
    }

};

// post login

module.exports.loginController= async(req,res)=>{
    try{
        const{email,password}=req.body;
        if(!email || !password){
            return res.send({error:"email or password is required"});

        }
        const user=await userModel.findOne({email});
        if(!user){
            return res.send({error:"user not found"});
        }
        const match=await comparePassword(password,user.password);
        if(!match){
            return res.send({error:"password is incorrect"});
        }
        //token
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
            expiresIn:"8d"
        });
        res.send({
            success:true,
            message:"login successfully",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                answer:user.answer,
                role:user.role
            },
            token,
        });


    } catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in login",
            error,
        });
    }
};

//forgot password
module.exports.forgotPasswordController=async(req,res)=>{
   try{
   const {email,newPassword,answer}= req.body;
   if(!email){
    res.status(400).send({message:"email is require"});
   }
   if(!answer){
    res.status(400).send({message:"answer is require"});
   }
   if(!newPassword){
    res.status(400).send({message:"newPassword is require"});
   }
   //check 
    const user=await userModel.findOne({email,answer});
    if(!user){
        return res.status(402).send({
            success:false,
            message:"wrong Email or answer "
        })
    }
    const hashed=await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id,{password:hashed});
    res.status(200).send({
        success:true,
        message:"password change successfully"
    });
   }catch(error){
    console.log(error);
    res.status(500).send({
        success:false,
        message:"something went wrong",
        error
    })
   }
};




module.exports.testController=(req,res)=>{
    res.send("protected route");
}

// update profile
module.exports.updateProfileController=async(req,res)=>{
    try {
        const { name, email, password, address, phone } = req.body;
        const user = await userModel.findById(req.user._id);
        //password
        if (password && password.length < 6) {
          return res.json({ error: "Passsword is required and 6 character long" });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(
          req.user._id,
          {
            name: name || user.name,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address || user.address,
          },
          { new: true }
        );
        res.status(200).send({
          success: true,
          message: "Profile Updated SUccessfully",
          updatedUser,
        });
      } catch (error) {
        console.log(error);
        res.status(400).send({
          success: false,
          message: "Error WHile Update profile",
          error,
        });
    }
}


