import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { createUserSchema, loginUserSchema } from '../validation/auth.js';
import { createUserController, loginUserController, refreshUserSessionController, logoutUserController } from '../controllers/auth.js';
import validateBody from '../middlewares/validateBody.js';

const authRouter = Router();

authRouter.post('/register', validateBody(createUserSchema), ctrlWrapper(createUserController));

authRouter.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));

authRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));

authRouter.post('/logout', ctrlWrapper(logoutUserController));

export default authRouter;
