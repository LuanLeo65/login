"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const accountModels_1 = __importDefault(require("./accountModels"));
function getAll() {
    return accountModels_1.default.findAll();
}
function getOne(id) {
    return accountModels_1.default.findOne({ where: { id: id } });
}
function create(body) {
    return accountModels_1.default.create(body);
}
function getByEmail(email) {
    return accountModels_1.default.findOne({ where: { email: email } });
}
function set(accountId, accountUpdated) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalAccount = yield accountModels_1.default.findByPk(accountId);
        if (originalAccount !== null) {
            if (accountUpdated.username)
                originalAccount.username = accountUpdated.username;
            if (accountUpdated.email)
                originalAccount.email = accountUpdated.email;
            if (accountUpdated.password)
                originalAccount.password = accountUpdated.password;
            yield originalAccount.save();
            return originalAccount;
        }
        return null;
    });
}
function removeById(id) {
    return accountModels_1.default.destroy({ where: { id: id } });
}
function removeByEmail(email) {
    return accountModels_1.default.destroy({ where: { email: email } });
}
exports.default = { getAll, getOne, create, removeById, set, getByEmail, removeByEmail };
