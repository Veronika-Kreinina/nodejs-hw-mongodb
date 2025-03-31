import createHttpError from 'http-errors';

export const validateBody = (shema) => {
  const func = async (req, _res, next) => {
    try {
      await shema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (error) {
      const errors = createHttpError(400, 'Bad Request', {
        errors: error.details,
      });
      next(errors);
    }
  };
  return func;
};
