import { ContactsCollection } from '../db/models/Contacts.js';

export const getAllContacts = () => ContactsCollection.find();

export const getOneContact = (_id) => ContactsCollection.findById(_id);

export const addContact = (payload) => ContactsCollection.create(payload);

export const updateContact = async (_id, payload, options = {}) => {
  const { upsert = false } = options;
  const result = await ContactsCollection.findOneAndUpdate({ _id }, payload, {
    new: true,
    upsert,
  });
  return result;
};
