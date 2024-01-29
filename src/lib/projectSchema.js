const joi = require("joi");

const createProjectSchema = joi.object({
  title: joi.string().required().min(3).messages({
    "string.empty": "O campo title não pode estar vázio.",
    "any.required": "O campo title é obrigatório.",
    "string.min": "O campo title precisa ter ao menos 3 caracteres.",
  }),
  tags: joi.string().required().min(2).messages({
    "string.empty": "O campo tag não pode estar vázio.",
    "any.required": "O campo tags é obrigatório",
    "string.min": "O campo tags precisa ter ao menos 2 caracteres",
  }),
  link: joi.string().messages({
    "string.base": "O campo link precisa ser do tipo string"
  }),
  description: joi.string().messages({
    "string.base": "O campo description precisa ser do tipo string."
  }),
  created_date: joi.string().messages({
    "string.base": "O campo created_date precisa ser do tipo string."
  }),
  image: joi.string().messages({
    "string.base": "O campo image precisa ser do tipo string."
  })
});

module.exports = {
  createProjectSchema,
};
