require("dotenv").config();
const express=require("express");
const cors=require("cors");
const connectDB=require("./src/config/db");

const app=express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth",require("./src/routes/authRoutes"));
app.use("/api/books",require("./src/routes/bookRoutes"));
app.use("/api/borrowings",require("./src/routes/borrowingRoutes"));
app.use("/api/analytics",require("./src/routes/analyticsRoutes"));

app.listen(process.env.PORT,()=>console.log("Server running on port "+process.env.PORT));
