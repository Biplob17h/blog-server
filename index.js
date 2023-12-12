import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import colors from 'colors'
import connectDB from "./config/db.js";

// CONFIG
dotenv.config("");

// APP
const app = express();

// MIDDLEWIRES
app.use(cors());
app.use(express.json());

// ROUTES

// HOMEPAGE
app.get("/", (req, res) => {
  res.send(`<h1>Blog server is running....</h1>`);
});

// LISTEN
const port = process.env.PORT || 5000;
app.listen(port ,()=>{
    console.log(`server is running on port ${port} `.bgWhite.green.bold)
    connectDB()
})


