import mysql from 'mysql2/promise'
export const connect = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'password',
        database: 'myAppDb'
    });
    return connection
}

