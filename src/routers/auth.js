import { Router } from 'express';
import { validateBody } from '../utils/validateBody.js';
import { authRegisterShema } from '../validation/auth.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerController } from '../controllers/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(authRegisterShema),
  ctrlWrapper(registerController),
);

export default authRouter;
