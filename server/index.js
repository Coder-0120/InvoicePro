const express=require("express");
const app=express();
const userRoute=require("./Routes/userRoute.js");
const businessRoute=require("./Routes/businessRoute.js");
const invoiceRoute=require("./Routes/invoiceRoute.js");
const connectDB=require("./config/db.js");
require("dotenv").config();
app.use(express.json());
connectDB();
app.get("/",(req,res)=>{
    res.send("hello world ");
})
app.use("/api/user",userRoute);
app.use("/api/business",businessRoute);
app.use("/api/invoice",invoiceRoute);
app.listen(5000,()=>{
    console.log("server is running on port 5000");
})