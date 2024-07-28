const mongoose=require("mongoose");

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    }, 
    email:{
        type:String,
        require:true,
        unique:true
    }, 
    password: {
        type:String,
        required:true
    },
    answer:{
      type:String,
      require:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:{},
        require:true
    },
    role:{
        type:Number,
        default:0
    }


},{timestamps:true})

module.exports=mongoose.model("users",userSchema);

