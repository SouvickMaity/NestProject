const mongoose= require("mongoose");

const connectdb=async()=>{
    try{
        const conn= await mongoose.connect(process.env.MONGO_URL);
        console.log(`connect mongodb ${conn.Connection.length}`);
    } catch(error){
        console.log(`error ${error}`);
    }
};

module.exports= connectdb;

