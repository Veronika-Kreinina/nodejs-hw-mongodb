import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export function isValidId(req, res, next) {
  const { id } = req.params;

  if (!id || !isValidObjectId(id)) {
    return next(createHttpError.BadRequest('ID is not valid'));
  }

  next();
}
