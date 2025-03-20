import { Router } from 'express';

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

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.get('/:contactId', ctrlWrapper(getContactByIdController));

contactsRouter.post(
  '/',
  validateBody(createContactShema),
  ctrlWrapper(addContactController),
);

contactsRouter.put(
  '/:contactId',
  validateBody(updateContactShema),
  ctrlWrapper(upsertContactController),
);

contactsRouter.patch(
  '/:contactId',
  validateBody(updateContactShema),
  ctrlWrapper(patchContactController),
);
contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactController));

export default contactsRouter;
