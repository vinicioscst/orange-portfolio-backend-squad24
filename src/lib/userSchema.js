const joi = require("joi");

const createUserSchema = joi.object({
  fullName: joi
    .string()
    .min(3)
    .required()
    .regex(/^[a-záéíóúâêîôûã][a-záéíóúâêîôûã]*(?: [a-záéíóúâêîôûã]+)*$/i)
    .messages({
      "string.pattern.base":
        "O campo nome precisa ser válido, verifique espaços em branco ou caracteres especiais.",
      "any.required": "O campo nome é obrigatório.",
      "string.empty": "O campo nome não pode ser vazio.",
      "string.min": "O campo nome precisa ter ao menos 3 caracteres.",
    }),
  email: joi.string().email().required().messages({
    "string.email": "O campo email precisar ser válido.",
    "any.required": "O campo email é obrigatório.",
    "string.empty": "O campo email não pode ser vazio.",
  }),
  password: joi.string().min(6).required().messages({
    "any.required": "O campo senha é obrigatório.",
    "string.empty": "O campo senha não pode ser vazio.",
    "string.min": "O campo senha precisar ter no mínimo 6 caracteres.",
  }),
});

const userLoginSchema = joi.object({
  email: joi.string().email().required().messages({
    "string.email": "O campo email precisar ser válido.",
    "any.required": "O campo email é obrigatório.",
    "string.empty": "O campo email não pode ser vazio.",
  }),
  password: joi.string().min(1).required().messages({
    "any.required": "O campo senha é obrigatório.",
    "string.empty": "O campo senha não pode ser vazio.",
    "string.min": "O campo senha precisar ter no mínimo 1 caractere.",
  }),
});

module.exports = {
  createUserSchema,
  userLoginSchema
};
