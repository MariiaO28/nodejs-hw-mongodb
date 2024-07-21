import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { createUserSchema, loginUserSchema } from '../validation/auth.js';
import { createUserController, loginUserController } from '../controllers/auth.js';
import validateBody from '../middlewares/validateBody.js';

const authRouter = Router();

authRouter.post('/register', validateBody(createUserSchema), ctrlWrapper(createUserController));

authRouter.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));

export default authRouter;
