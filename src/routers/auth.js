import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { createUserSchema, loginUserSchema, requestResetEmailSchema, resetPasswordSchema } from '../validation/auth.js';
import { createUserController, loginUserController, refreshUserSessionController, logoutUserController, requestResetEmailController, resetPasswordController } from '../controllers/auth.js';
import validateBody from '../middlewares/validateBody.js';

const authRouter = Router();

authRouter.post('/register', validateBody(createUserSchema), ctrlWrapper(createUserController));

authRouter.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));

authRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));

authRouter.post('/logout', ctrlWrapper(logoutUserController));

authRouter.post('/send-reset-email', validateBody(requestResetEmailSchema), ctrlWrapper(requestResetEmailController));

authRouter.post('/reset-pwd', validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordController));

export default authRouter;
