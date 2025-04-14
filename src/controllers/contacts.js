import createHttpError from 'http-errors';
import * as fs from 'node:fs/promises';
import path from 'node:path';

import {
  addContact,
  deleteContact,
  getAllContacts,
  getOneContact,
  updateContact,
} from '../services/contacts.js';

import { getEnvVar } from '../utils/getEnvVar.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { sortByKeys } from '../db/models/Contacts.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';

export const getContactsController = async (req, res) => {
  console.log(req.user);

  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, sortByKeys);
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    userId: req.user._id,
    filter,
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

  const contact = await getOneContact(contactId, req.user._id);

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
  let photo = null;

  if (getEnvVar('UPLOAD_TO_CLOUDINARY') === 'true') {
    const result = await uploadToCloudinary(req.file.path);
    photo = result.secure_url;
  } else {
    await fs.rename(
      req.file.path,
      path.resolve('src', 'uploads', req.file.filename),
    );

    photo = `${getEnvVar('APP_DOMAIN')}/uploads/${req.file.filename}`;
  }

  const contact = await addContact({
    ...req.body,
    userId: req.user._id,
    photo,
  });

  res.status(201).json({
    status: 201,
    message: 'Succesfully created a contact',
    data: contact,
  });
};

export const upsertContactController = async (req, res) => {
  const { contactId } = req.params;
  let photo = null;

  if (req.file) {
    if (getEnvVar('UPLOAD_TO_CLOUDINARY') === 'true') {
      const result = await uploadToCloudinary(req.file.path);
      photo = result.secure_url;
    } else {
      await fs.rename(
        req.file.path,
        path.resolve('src', 'uploads', req.file.filename),
      );
      photo = `${getEnvVar('APP_DOMAIN')}/uploads/${req.file.filename}`;
    }
  }
  const updatedData = {
    ...req.body,
    ...(photo && { photo }),
  };

  const { isNew, data } = await updateContact(
    contactId,
    req.user._id,
    updatedData,

    {
      upsert: true,
    },
  );

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully patched a contact!',
    data,
  });
};

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;

  let photo;

  if (req.file) {
    if (getEnvVar('UPLOAD_TO_CLOUDINARY') === 'true') {
      const result = await uploadToCloudinary(req.file.path);
      photo = result.secure_url;
    } else {
      await fs.rename(
        req.file.path,
        path.resolve('src', 'uploads', req.file.filename),
      );
      photo = `${getEnvVar('APP_DOMAIN')}/uploads/${req.file.filename}`;
    }
  }

  const updatedData = {
    ...req.body,
    ...(photo && { photo }),
  };
  const result = await updateContact(contactId, req.user._id, updatedData);

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
  const result = await deleteContact(contactId, req.user._id);
  if (!result) {
    throw new createHttpError(404, 'Contact with id:${contactId} not found');
  }

  res.status(204).send();
};
