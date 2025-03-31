import { Router } from 'express';
import { validateBody } from '../utils/validateBody.js';
import { registerShema, loginSchema } from '../validation/auth.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginController,
  registerController,
  logoutController,
} from '../controllers/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerShema),
  ctrlWrapper(registerController),
);

authRouter.post(
  '/login',
  validateBody(loginSchema),
  ctrlWrapper(loginController),
);

authRouter.post('/logout', logoutController);

export default authRouter;
