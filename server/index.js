const express=require("express");
const app=express();
const cors=require("cors");
const userRoute=require("./Routes/userRoute.js");
const businessRoute=require("./Routes/businessRoute.js");
const invoiceRoute=require("./Routes/invoiceRoute.js");
const dashboardRoute=require("./Routes/dashboardRoute.js");

const connectDB=require("./config/db.js");
require("dotenv").config();
app.use(express.json());
// app.use(cors());
// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000",
//       "https://invoice-pro-sepia.vercel.app"
//     ]
//   })
// );
app.use(cors({
  origin: [
    'https://invoice-pro-sepia.vercel.app',
    'http://localhost:3000' // optional for dev
  ],
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
}));

connectDB();
app.get("/",(req,res)=>{
    res.send("hello world ");
})
app.use("/api/user",userRoute);
app.use("/api/business",businessRoute);
app.use("/api/invoice",invoiceRoute);
app.use("/api/dashboard",dashboardRoute);
app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})