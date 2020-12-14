import { Router } from "express";
import authController from "../controllers/auth.controller";
import catchAsync from "../middleware/catchAsync";
import authentication from '../middleware/authenticate';

const { signup, login, protectedRoute, logout } = authController;
const { authenticate } = authentication;

const authRouter = Router();

authRouter.post('/signup', catchAsync(signup));
authRouter.post('/login', catchAsync(login));
authRouter.get('/sample-protected-url', authenticate, catchAsync(protectedRoute));

export default authRouter;