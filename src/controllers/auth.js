import { register } from '../services/auth.js';

export const registerController = async (req, res) => {
  const user = await register(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};
