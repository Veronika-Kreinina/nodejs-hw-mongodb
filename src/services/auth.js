import createHttpError from 'http-errors';
import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { UserCollection } from '../db/models/User.js';
import { SessionCollection } from '../db/models/Session.js';

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

export const refresh = async (sessionId, refreshToken) => {
  const currentSession = await SessionCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (currentSession === null) {
    throw createHttpError.Unauthorized('Session not found');
  }

  if (currentSession.refreshTokenValidUntil < new Date()) {
    throw createHttpError.Unauthorized('Refresh token is expired');
  }
  await SessionCollection.deleteOne({
    _id: currentSession._id,
    refreshToken: currentSession.refreshToken,
  });

  return SessionCollection.create({
    userId: currentSession.userId,
    accessToken: crypto.randomBytes(30).toString('base64'),
    refreshToken: crypto.randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000),
    refreshTokenValidUntil: new Date(Date.now() + 30 * 24 * 10 * 60 * 1000),
  });
};

export const requestResetPassword = async (email) => {
  const user = await UserCollection.findOne({ email });
  if (user === null) {
    throw createHttpError.NotFound('User not found');
  }
};
