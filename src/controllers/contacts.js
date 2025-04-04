import createHttpError from 'http-errors';

import {
  addContact,
  deleteContact,
  getAllContacts,
  getOneContact,
  updateContact,
} from '../services/contacts.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { sortByKeys } from '../db/models/Contacts.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, sortByKeys);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
  });

  if (!contacts) {
    throw new createHttpError(404, `Contact not found`);
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
  console.log('contactId:', contactId);

  if (!contact) {
    throw new createHttpError(404, `Contact with id:${contactId} not found`);
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
    .json({ status: 201, message: 'Succesfully created a contact', data });
};

export const upsertContactController = async (req, res) => {
  const { contactId } = req.params;
  const { isNew, data } = await updateContact(contactId, req.body, {
    upsert: true,
  });

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully patched a contact!',
    data,
  });
};

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);

  if (!result) {
    throw new createHttpError(404, 'Contact with id:${contactId} not found');
  }
  console.log(result);

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.data,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const result = await deleteContact({ _id: contactId });
  if (!result) {
    throw new createHttpError(404, 'Contact with id:${contactId} not found');
  }

  res.status(204).send();
};
