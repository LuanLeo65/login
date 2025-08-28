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
const accountRepository_1 = __importDefault(require("../models/accounts/accountRepository"));
const refreshRepository_1 = __importDefault(require("../models/refresh/refreshRepository"));
const auth_1 = __importDefault(require("../auth"));
function getAccounts(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const accounts = yield accountRepository_1.default.getAll();
            if (!accounts)
                return res.status(404).json({ erro: "Nenhum usuario encontrado" });
            return res.status(200).json(accounts);
        }
        catch (error) {
            console.log(`Erro no getAccounts: ${error}`);
        }
    });
}
function getAccount(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            if (!id)
                return res.status(400).json({ erro: "Id invalido" });
            const account = yield accountRepository_1.default.getOne(id);
            if (!account)
                return res.status(404).json({ erro: "Nenhum usuario encontrado" });
            return res.status(200).json(account);
        }
        catch (error) {
            console.log(`Erro no getAccount: ${error}`);
        }
    });
}
function addAccount(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newAccount = req.body;
            if (!newAccount)
                return res.status(400).json({ erro: "Informacoes invalidas" });
            newAccount.password = auth_1.default.hashPassword(newAccount.password);
            const result = yield accountRepository_1.default.create(newAccount);
            newAccount.password = '';
            newAccount.id = result.id;
            return res.status(201).json(newAccount);
        }
        catch (error) {
            console.log(`Erro no addAccount: ${error}`);
        }
    });
}
function setAccount(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            if (!id)
                return res.status(400).json({ erro: "Id invalido" });
            const payload = req.body;
            if (!payload)
                return res.status(400).json({ erro: "Informacoes invalidas" });
            if (payload.password) {
                payload.password = auth_1.default.hashPassword(payload.password);
            }
            const result = yield accountRepository_1.default.set(id, payload);
            if (result == null)
                return res.status(404).json(({ erro: "Usuario nao encontrado" }));
            return res.status(200).json(result);
        }
        catch (error) {
            console.log(`Erro no setAccount: ${error}`);
        }
    });
}
function deleteAccount(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            if (!id)
                return res.status(400).json({ erro: "Id invalido" });
            const result = yield accountRepository_1.default.removeById(id);
            if (!result)
                return res.status(404).json({ erro: "Usuario nao encontrado" });
            return res.status(200).json({ message: "Usuario deletado com sucesso" });
        }
        catch (error) {
            console.log(`Erro no deleteAccount: ${error}`);
        }
    });
}
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const loginParams = req.body;
            const account = yield accountRepository_1.default.getByEmail(loginParams.email);
            if (account !== null) {
                const passwordMatch = yield auth_1.default.comparePassword(loginParams.password, account.password);
                if (passwordMatch) {
                    const token = auth_1.default.signJWT(account.id);
                    const refreshToken = auth_1.default.signRefresh(account.id);
                    yield refreshRepository_1.default.saveRefresh(account.id, refreshToken);
                    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: false });
                    return res.status(200).json({ message: `Usuario ${account.username} logado com sucesso!`, token: token, user: { id: account.id } });
                }
                return res.status(401).json({ erro: "E-mail ou Senha invalido" });
            }
            return res.status(401).json({ erro: "E-mail ou Senha invalido" });
        }
        catch (error) {
            console.log(`Erro no addAccount: ${error}`);
            return res.sendStatus(500);
        }
    });
}
function logout(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        res.status(200).json({ token: null });
    });
}
function refresh(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.cookies.refreshToken;
        if (!token)
            return res.sendStatus(403);
        const dbRefreshToken = yield refreshRepository_1.default.getRefreshToken(token);
        if (!dbRefreshToken)
            return res.sendStatus(403);
        if (dbRefreshToken.expires_at < new Date()) {
            yield refreshRepository_1.default.deleteByToken(dbRefreshToken.token);
            return res.status(403).json({ erro: "Refresh token expirado" });
        }
        const refreshKey = `${process.env.REFRESH_KEY}`;
        try {
            const user = yield auth_1.default.verifyRefresh(token, refreshKey);
            const newAccessToken = auth_1.default.signJWT(user.userId);
            return res.json({ token: newAccessToken, user: { id: user.userId } });
        }
        catch (error) {
            console.error("Erro no refresh:", error);
            return res.status(403).json({ erro: `Erro ao tentar buscar o refresh token: ${error}` });
        }
    });
}
function deleteRefresh(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        if (!id)
            return res.json({ erro: "id invalido" });
        yield refreshRepository_1.default.deleteRefreshById(id);
    });
}
exports.default = { getAccounts, addAccount, getAccount, setAccount, deleteAccount, login, logout, refresh, deleteRefresh };
