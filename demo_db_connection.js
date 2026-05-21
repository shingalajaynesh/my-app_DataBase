const mysql = require('mysql2/promise');

module.exports.connect = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'password',
        database: 'myAppDb'
    });
    return connection
}

