import { model, Schema } from 'mongoose';

const contactsShema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isFavourite: {
    type: Boolean,
    default: false,
    required: true,
  },
  contactType: {
    enum: ['personal', 'home'],
    default: 'personal',
    required: true,
  },
});

export const ContactsCollection = model('contacts', contactsShema);
