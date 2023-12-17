import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import categoryRouter from "./routes/categoryRoute.js"
import blogRouter from "./routes/blogRoute.js"
import aboutPageRouter from "./routes/aboutPageRoute.js"
import aboutPageEndRouter from "./routes/aboutPageEndRoute.js"
import aboutMeRouter from "./routes/aboutMeRoute.js"



// CONFIG
dotenv.config();

// APP
const app = express();

// MIDDLEWIRES
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/v1/user", userRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/aboutpage", aboutPageRouter);
app.use("/api/v1/aboutpage", aboutPageEndRouter);
app.use("/api/v1/aboutme", aboutMeRouter);

// HOMEPAGE
app.get("/", (req, res) => {
  res.send(`<h1>Blog server is running....</h1>`);
});

// LISTEN
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`.magenta);
  connectDB();
});
