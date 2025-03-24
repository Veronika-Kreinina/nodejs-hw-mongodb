import createHttpError from 'http-errors';

export const validateBody = (shema) => {
  const func = async (req, _res, next) => {
    try {
      await shema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (error) {
      const errors = error.details.map((detail) => {
        detail.message;
      });
      next(new createHttpError.BadRequest(errors));
    }
  };
  return func;
};
