import { Router } from 'express';
import { validateBody } from '../utils/validateBody.js';
import {
  registerShema,
  loginSchema,
  requestPasswordResetSchema,
} from '../validation/auth.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginController,
  registerController,
  logoutController,
  refreshController,
  requestPasswordResetController,
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

authRouter.post(
  '/request-password-reset',
  validateBody(requestPasswordResetSchema),
  ctrlWrapper(requestPasswordResetController),
);

export default authRouter;
