import { Router } from 'express';

import express from 'express';

import {
  getContactsController,
  getContactByIdController,
  addContactController,
  upsertContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { validateBody } from '../utils/validateBody.js';
import {
  createContactShema,
  updateContactShema,
} from '../validation/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { upload } from '../middlewares/upload.js';

const contactsRouter = Router();
const jsonParser = express.json();

contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);

contactsRouter.post(
  '/',
  upload.single('photo'),
  validateBody(createContactShema),
  ctrlWrapper(addContactController),
);

contactsRouter.put(
  '/:contactId',
  upload.single('photo'),
  jsonParser,
  isValidId,
  validateBody(updateContactShema),
  ctrlWrapper(upsertContactController),
);

contactsRouter.patch(
  '/:contactId',
  upload.single('photo'),
  jsonParser,
  isValidId,
  validateBody(updateContactShema),
  ctrlWrapper(patchContactController),
);
contactsRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default contactsRouter;
