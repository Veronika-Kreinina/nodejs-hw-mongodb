export const validateBody = (shema) => {
  const func = async (req, res, next) => {
    try {
      await shema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (error) {
      const errorDetails = error.error.details.map((detail) => detail.message);
      res.status(400).json({
        status: 400,
        error: errorDetails,
      });
      next();
    }
  };
  return func;
};
