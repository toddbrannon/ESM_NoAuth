"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const mysql_1 = require("mysql");
exports.pool = (0, mysql_1.createPool)({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    multipleStatements: true,
    ssl: true,
    connectionLimit: 10
});
//# sourceMappingURL=database.js.map