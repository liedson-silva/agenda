import { Router } from "express";
import { LoginUser, RegisterUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/register", RegisterUser);
userRouter.post("/login", LoginUser);

export default userRouter;