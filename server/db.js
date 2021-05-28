const Pool = require("pg").Pool;

const deploymentServer = "192.168.254.170";
const localServer = "localhost";
const pool = new Pool({
    user: "my_user",
    password: "root",
    host: localServer,
    port: 5432,
    database: "onpoint_database"
});

module.exports = pool;