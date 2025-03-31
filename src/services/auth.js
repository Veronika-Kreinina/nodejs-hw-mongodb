import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { UserCollection } from '../db/models/User.js';

export const register = async (payload) => {
  const newUser = await UserCollection.findOne({ email: payload.email });

  if (newUser !== null) {
    throw createHttpError.Conflict('Email in use');
  }

  payload.password = await bcrypt.hash(payload.password, 10);

  return UserCollection.create(payload);
};
