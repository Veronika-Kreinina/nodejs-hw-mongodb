import { ContactsCollection } from '../db/models/Contacts.js';

export const getAllContacts = () => ContactsCollection.find();

export const getOneContact = (_id) => ContactsCollection.findById(_id);
