"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const account_1 = __importDefault(require("../controller/account"));
const middlewares_1 = __importDefault(require("./middlewares"));
const route = (0, express_1.Router)();
route.get('/accounts', middlewares_1.default.validateAutentication, account_1.default.getAccounts);
route.get('/accounts/:id', middlewares_1.default.validateAutentication, account_1.default.getAccount);
route.post('/accounts', middlewares_1.default.validateAccountSchema, account_1.default.addAccount);
route.post('/login', middlewares_1.default.validateLoginSchema, account_1.default.login);
route.post('/logout', middlewares_1.default.validateAutentication, account_1.default.logout);
route.patch('/accounts/:id', middlewares_1.default.validateAutentication, middlewares_1.default.validateUpdateSchema, account_1.default.setAccount);
route.delete('/accounts/:id', middlewares_1.default.validateAutentication, account_1.default.deleteAccount);
route.post('/refresh', account_1.default.refresh);
route.delete('/refresh/:id', middlewares_1.default.validateAutentication, account_1.default.deleteRefresh);
exports.default = route;
