const { Pool } = require("pg");

const config = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
};

const pool = new Pool(config);

module.exports = {
    query: (query, parameters) => pool.query(query, parameters),
};