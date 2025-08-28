"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const user_db = process.env.DB_USER;
const name_db = process.env.DB_NAME;
const password_db = process.env.DB_PASSWORD;
const host_db = process.env.DB_HOST;
const database = new sequelize_1.Sequelize(name_db, user_db, password_db, {
    dialect: 'mysql',
    host: host_db
});
exports.default = database;
