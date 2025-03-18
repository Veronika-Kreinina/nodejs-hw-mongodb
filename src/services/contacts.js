import { ContactsCollection } from '../db/models/';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getOneContact = async (_id) => {
  const contact = await ContactsCollection.findById(_id);
  return contact;
};
