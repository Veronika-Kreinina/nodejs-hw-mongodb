import { login, logout, refresh, register } from '../services/auth.js';

export const registerController = async (req, res) => {
  const user = await register(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginController = async (req, res) => {
  const session = await login(req.body.email, req.body.password);
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expire: session.refreshTokenValidUntil,
  });
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expire: session.refreshTokenValidUntil,
  });

  res.status(200).json({
    status: 200,
    message: 'User successfully logged',
    data: { accessToken: session.accessToken },
  });
};

export const logoutController = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;

  if (typeof sessionId === 'string') {
    await logout(sessionId, refreshToken);
  }
  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).end();
};

export const refreshController = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;

  const session = await refresh(sessionId, refreshToken);
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expire: session.refreshTokenValidUntil,
  });
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expire: session.refreshTokenValidUntil,
  });

  res.status(200).json({
    status: 200,
    message: 'User successfully logged',
    data: { accessToken: session.accessToken },
  });
};
