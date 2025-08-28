"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAssociations = setupAssociations;
const accountModels_1 = __importDefault(require("./accounts/accountModels"));
const refreshModel_1 = __importDefault(require("./refresh/refreshModel"));
function setupAssociations() {
    accountModels_1.default.hasMany(refreshModel_1.default, { foreignKey: 'userId', onDelete: "CASCADE", as: 'refreshTokens' });
    refreshModel_1.default.belongsTo(accountModels_1.default, { foreignKey: 'userId', as: 'account' });
}
