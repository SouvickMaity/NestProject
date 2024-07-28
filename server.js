const express=require("express");
const app=express();
const dotenv=require("dotenv");
const morgan=require("morgan");
const connectdb = require("./config/db");
//import connectdb from "./config/db.js";
const authRoutes =require("./routes/authRoute");
const categoryRoutes=require("./routes/categoryRoutes");
const productRoutes=require("./routes/productRoutes");
const cors=require("cors");

//configer env
dotenv.config();

//database config
connectdb();


//middleware 
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));




//routes
app.use("/api/v1/auth",authRoutes);  
app.use("/api/v1/category",categoryRoutes);
app.use("/api/v1/product",productRoutes);

//rest api
app.get("/",(req,res)=>{
    res.send("hellpo");
});

const port=process.env.PORT||3080;

app.listen(port,()=>{
    console.log("server is running on port 3080");
});


