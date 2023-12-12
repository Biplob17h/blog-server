import express from "express";
import { CreateAUser } from "../controller/userController.js";



const userRouter = express.Router();

userRouter.post('/signup', CreateAUser)

export default userRouter;
