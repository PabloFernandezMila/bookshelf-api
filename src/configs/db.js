const { Pool } = require("pg");

const config = {
    user: "postgres",
    host: "localhost",
    password: "Bookshelf",
    database: "postgres",
    port: 5432,
};

const pool = new Pool(config);

module.exports = {
    query: (query, parameters) => pool.query(query, parameters),
};