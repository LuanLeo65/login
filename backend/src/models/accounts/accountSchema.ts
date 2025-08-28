import Joi from "joi";

const accountSchema = Joi.object({
  id: Joi.number().integer().min(1),
  username: Joi.string().min(3).max(150).required().messages({
      "string.min": "O nome deve ter pelo menos 3 caracteres",
      "string.max": "O nome não pode ter mais de 150 caracteres",
    }),
  email: Joi.string().email().min(8).max(150).required().messages({
      "string.email": "Digite um e-mail válido",
      "string.min": "O e-mail deve ter pelo menos 8 caracteres",
      "string.max": "O e-mail não pode ter mais de 150 caracteres",
    }),
  password: Joi.string().min(6).max(150).required().messages({
      "string.min": "A senha deve ter pelo menos 6 caracteres",
      "string.max": "A senha não pode ter mais de 150 caracteres",
    }),
});

const accountUpdateSchema = Joi.object({
  username: Joi.string()
  .min(3)
  .max(150)
  .messages({
      "string.min": "O nome deve ter pelo menos 3 caracteres",
      "string.max": "O nome não pode ter mais de 150 caracteres",
    }),
  email: Joi.string().email().min(8).max(150).messages({
      "string.email": "Digite um e-mail válido",
      "string.min": "O e-mail deve ter pelo menos 8 caracteres",
      "string.max": "O e-mail não pode ter mais de 150 caracteres",
    }),
  password: Joi.string().min(6).max(150).messages({
      "string.min": "A senha deve ter pelo menos 6 caracteres",
      "string.max": "A senha não pode ter mais de 150 caracteres",
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().min(8).max(150).required().messages({
      "string.email": "Digite um e-mail válido",
      "string.min": "O e-mail deve ter pelo menos 8 caracteres",
      "string.max": "O e-mail não pode ter mais de 150 caracteres",
    }),
  password: Joi.string().min(6).max(150).required().messages({
      "string.min": "A senha deve ter pelo menos 6 caracteres",
      "string.max": "A senha não pode ter mais de 150 caracteres",
    }),
});

export { accountSchema, accountUpdateSchema, loginSchema };
