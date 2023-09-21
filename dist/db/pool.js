"use strict";
// @ts-nocheck
const { Pool } = require("pg");
const { HOST, PORT, DATABASE_NAME } = process.env;
const pool = new Pool({
    host: HOST !== null && HOST !== void 0 ? HOST : 'localhost',
    port: PORT !== null && PORT !== void 0 ? PORT : 5432,
    database: DATABASE_NAME !== null && DATABASE_NAME !== void 0 ? DATABASE_NAME : 'costume_shop_db_test'
});
pool.on("error", (error) => {
    console.error(error.stack());
});
module.exports = { pool };
