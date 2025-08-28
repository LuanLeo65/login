"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../../db"));
const RefreshToken = db_1.default.define("refreshToken", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    token: {
        type: sequelize_1.DataTypes.STRING(1000),
        allowNull: false,
    },
    expires_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    revoked: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'accounts',
            key: 'id'
        },
        onDelete: "CASCADE"
    }
});
exports.default = RefreshToken;
