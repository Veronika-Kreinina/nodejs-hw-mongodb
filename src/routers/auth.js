import { Router } from 'express';
import { valiteBody } from '../utils/validateBody.js';
import { authRegisterShema } from '../validation/auth.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerController } from '../controllers/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  valiteBody(authRegisterShema),
  ctrlWrapper(registerController),
);

export default authRouter;
