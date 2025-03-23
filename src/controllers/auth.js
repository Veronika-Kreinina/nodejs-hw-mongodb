import { register } from '../services/auth';

export const registerController = async (req, res) => {
  const data = await register(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data,
  });
};
