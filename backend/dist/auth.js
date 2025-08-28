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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
//HASH
const salt = parseInt(`${process.env.SALT_ROUND}`);
//JWT
const privateKey = fs_1.default.readFileSync(path_1.default.join(__dirname, "../keys/private.key"), "utf8");
const publicKey = fs_1.default.readFileSync(path_1.default.join(__dirname, "../keys/public.key"), "utf8");
const jwtAlgorithm = "RS256";
const refreshKey = `${process.env.REFRESH_KEY}`;
const refreshAlgorithm = "HS256";
function hashPassword(password) {
    return bcrypt_1.default.hashSync(password, salt);
}
function comparePassword(password, hashPassword) {
    return bcrypt_1.default.compareSync(password, hashPassword);
}
function signJWT(userId) {
    const payload = { userId };
    return jsonwebtoken_1.default.sign(payload, privateKey, { expiresIn: "15m", algorithm: jwtAlgorithm });
}
function signRefresh(userId) {
    const payload = { userId };
    return jsonwebtoken_1.default.sign(payload, refreshKey, { expiresIn: "7d", algorithm: refreshAlgorithm });
}
function verifyJWT(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tokenHeader = req.headers['x-access-token'];
            if (!tokenHeader)
                return res.sendStatus(401);
            const decoded = yield jsonwebtoken_1.default.verify(tokenHeader, publicKey, { algorithms: [jwtAlgorithm] });
            const payload = { userId: decoded.userId, jwt: tokenHeader };
            res.locals.payload = payload;
            next();
            /*             MANEIRA ALTERNATIVA DE FAZER
    
            jwt.verify(tokenHeader, publicKey, {algorithms: [jwtAlgorithm]} , (err, decoded) => {
            if(err) return res.status(401).json({erro: 'Token Inválido'})
    
            res.locals.payload = decoded
            next()
            } )
            
            */
        }
        catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ error: "Token expired" });
            }
            return res.status(401).json({ error: "Invalid token" });
        }
    });
}
function verifyRefresh(token, key) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield jsonwebtoken_1.default.verify(token, key, { algorithms: [refreshAlgorithm] });
    });
}
function validateJoiSchema(schema, req, res, next) {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error == null)
        return next();
    const fieldErrors = {};
    error.details.forEach(item => {
        const key = item.path[0];
        fieldErrors[key] = item.message;
    });
    return res.status(422).json({ error: "ValidationError", fieldErrors });
}
exports.default = { hashPassword, comparePassword, signJWT, verifyJWT, validateJoiSchema, signRefresh, verifyRefresh };
