import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';

import contactsRouter from './routers/contacts.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
// import { logger } from './middlewares/logger.js';
import authRouter from './routers/auth.js';

export const setupServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  // app.use(logger);
  app.use(cookieParser());

  app.use('/auth', authRouter);
  app.use('/contacts', contactsRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  const PORT = Number(getEnvVar('PORT', 3000));
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
