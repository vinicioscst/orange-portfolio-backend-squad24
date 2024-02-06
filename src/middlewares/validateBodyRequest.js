const validateBodyRequest = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }

  next();
};

module.exports = {
  validateBodyRequest,
};
