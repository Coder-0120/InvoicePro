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
const allowedOrigins = [
  'https://invoice-1ymtcu128-anshul-vermas-projects-02bf349c.vercel.app', // NEW frontend
  'https://invoice-pro-git-main-anshul-vermas-projects-02bf349c.vercel.app', // OLD frontend (optional)
  'http://localhost:3000' // local dev
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests like Postman or mobile apps with no origin
    if (!origin) return callback(null, true); 

    if (allowedOrigins.includes(origin)) return callback(null, true);

    callback(new Error('CORS not allowed'), false);
  },
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type','Authorization']
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