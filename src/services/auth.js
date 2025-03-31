import createHttpError from 'http-errors';
import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { UserCollection } from '../db/models/User.js';
import { SessionCollection } from '../db/models/Session.js';
import { Session } from 'node:inspector';

export const register = async (payload) => {
  const newUser = await UserCollection.findOne({ email: payload.email });

  if (newUser !== null) {
    throw createHttpError.Conflict('Email in use');
  }

  payload.password = await bcrypt.hash(payload.password, 10);

  return UserCollection.create(payload);
};

export const login = async (email, password) => {
  const user = await UserCollection.findOne({ email });

  if (user === null) {
    throw createHttpError.Unauthorized('Email or password is incorrect');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch !== true) {
    throw createHttpError.Unauthorized('Email or password is incorrect');
  }

  await SessionCollection.deleteOne({ userId: user._id });

  return SessionCollection.create({
    userId: user._id,
    accessToken: crypto.randomBytes(30).toString('base64'),
    refreshToken: crypto.randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + 10 * 60 * 1000),
    refreshTokenValidUntil: new Date(Date.now() + 24 * 10 * 60 * 1000),
  });
};

export const logout = async (sessionId) => {
  await SessionCollection.deleteOne({ _id: sessionId });
  return undefined;
};
