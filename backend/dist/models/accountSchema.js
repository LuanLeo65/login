"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.accountUpdateSchema = exports.accountSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const accountSchema = joi_1.default.object({
    id: joi_1.default.number().integer().min(1),
    username: joi_1.default.string().min(3).max(150).required().messages({
        "string.min": "O nome deve ter pelo menos 3 caracteres",
        "string.max": "O nome não pode ter mais de 150 caracteres",
    }),
    email: joi_1.default.string().email().min(8).max(150).required().messages({
        "string.email": "Digite um e-mail válido",
        "string.min": "O e-mail deve ter pelo menos 8 caracteres",
        "string.max": "O e-mail não pode ter mais de 150 caracteres",
    }),
    password: joi_1.default.string().min(6).max(150).required().messages({
        "string.min": "A senha deve ter pelo menos 6 caracteres",
        "string.max": "A senha não pode ter mais de 150 caracteres",
    }),
});
exports.accountSchema = accountSchema;
const accountUpdateSchema = joi_1.default.object({
    username: joi_1.default.string()
        .min(3)
        .max(150)
        .messages({
        "string.min": "O nome deve ter pelo menos 3 caracteres",
        "string.max": "O nome não pode ter mais de 150 caracteres",
    }),
    email: joi_1.default.string().email().min(8).max(150).messages({
        "string.email": "Digite um e-mail válido",
        "string.min": "O e-mail deve ter pelo menos 8 caracteres",
        "string.max": "O e-mail não pode ter mais de 150 caracteres",
    }),
    password: joi_1.default.string().min(6).max(150).messages({
        "string.min": "A senha deve ter pelo menos 6 caracteres",
        "string.max": "A senha não pode ter mais de 150 caracteres",
    }),
});
exports.accountUpdateSchema = accountUpdateSchema;
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().min(8).max(150).required().messages({
        "string.email": "Digite um e-mail válido",
        "string.min": "O e-mail deve ter pelo menos 8 caracteres",
        "string.max": "O e-mail não pode ter mais de 150 caracteres",
    }),
    password: joi_1.default.string().min(6).max(150).required().messages({
        "string.min": "A senha deve ter pelo menos 6 caracteres",
        "string.max": "A senha não pode ter mais de 150 caracteres",
    }),
});
exports.loginSchema = loginSchema;
