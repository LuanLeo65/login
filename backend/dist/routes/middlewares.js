"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const accountSchema_1 = require("../models/accounts/accountSchema");
const auth_1 = __importDefault(require("../auth"));
function validateAccountSchema(req, res, next) {
    return auth_1.default.validateJoiSchema(accountSchema_1.accountSchema, req, res, next);
}
function validateUpdateSchema(req, res, next) {
    return auth_1.default.validateJoiSchema(accountSchema_1.accountUpdateSchema, req, res, next);
}
function validateLoginSchema(req, res, next) {
    return auth_1.default.validateJoiSchema(accountSchema_1.loginSchema, req, res, next);
}
function validateAutentication(req, res, next) {
    return auth_1.default.verifyJWT(req, res, next);
}
exports.default = { validateAccountSchema, validateUpdateSchema, validateLoginSchema, validateAutentication };
