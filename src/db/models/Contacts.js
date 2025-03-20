import { model, Schema } from 'mongoose';

const contactsShema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
      required: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'personal', 'home'],
      default: false,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);
export const ContactsCollection = model('contacts', contactsShema);
