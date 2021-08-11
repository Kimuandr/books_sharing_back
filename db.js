const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: 'Naumchyk1988+',
    host: "localhost",
    port: 5432,
    database: "books_sharing"
});

module.exports = pool;