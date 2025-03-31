import { Router } from 'express';
import { validateBody } from '../utils/validateBody.js';
import { registerShema, loginSchema } from '../validation/auth.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginController,
  registerController,
  logoutController,
  refreshController,
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

authRouter.post('/logout', ctrlWrapper(logoutController));

authRouter.post('/refresh', ctrlWrapper(refreshController));

export default authRouter;
