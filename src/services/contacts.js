import { ContactsCollection } from '../db/models/Contacts.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
}) => {
  const limit = perPage;
  const skip = (page - 1) * limit;

  const [totalItems, contacts] = await Promise.all([
    ContactsCollection.countDocuments(),
    ContactsCollection.find()
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder }),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  return {
    data: contacts,
    page,
    perPage,
    totalItems,
    totalPages,
    hasNexPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
};

export const getOneContact = (_id) => ContactsCollection.findById(_id);

export const addContact = (payload) => ContactsCollection.create(payload);

export const updateContact = async (_id, payload, options = {}) => {
  const { upsert = false } = options;
  const result = await ContactsCollection.findOneAndUpdate({ _id }, payload, {
    new: true,
    upsert,
    runValidators: true,
    includeResultMetadata: true,
  });

  if (!result || !result.value) return null;

  const isNew = Boolean(result.lastErrorObject.upserted);
  return {
    isNew,
    data: result.value,
  };
};

export const deleteContact = (_id) => ContactsCollection.findOneAndDelete(_id);
