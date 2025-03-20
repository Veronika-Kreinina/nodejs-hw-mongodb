import createHttpError from 'http-errors';

import {
  addContact,
  getAllContacts,
  getOneContact,
  updateContact,
} from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  const contacts = await getAllContacts();

  if (!contacts) {
    throw createHttpError(404, `Contact not found`);
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getOneContact(contactId);

  if (!contact) {
    throw createHttpError(404, `Contact with id:${contactId} not found`);
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const addContactController = async (req, res) => {
  const data = await addContact(req.body);

  res
    .status(201)
    .json({ status: 201, message: 'Succesfully add contact', data });
};

export const upsertContactController = async (req, res) => {
  const { contactId } = req.params;
  const data = await updateContact(contactId, req.body, { upsert: true });

  res.status(200).json({
    status: 200,
    message: 'Successfull update',
    data,
  });
};
