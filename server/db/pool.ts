// @ts-nocheck

const {Pool} = require("pg");

const {
    HOST,
    PORT,
    DATABASE_NAME
} = process.env;

const pool = new Pool({
    host: HOST ?? 'localhost',
    port: PORT ?? 5432,
    database: DATABASE_NAME ?? 'costume_shop_db_test'
});
pool.on("error", (error) => {
    console.error(error.stack())
});

module.exports = {pool};