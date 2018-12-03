const mysql = require('mysql');

require('dotenv').config();
var pool = mysql.createPool({
    host: PROCESS.env.host,
    user: PROCESS.env.user,
    password: PROCESS.env.password,
    database: PROCESS.env.database
});

exports.get = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(Error(err))
            } else {
                var querystring = `SELECT * FROM keyword;`
                connection.query(querystring, (error, results) => {
                    if (error) {
                        reject(error)
                    }
                    else {
                        resolve(results)
                    }
                    connection.release()
                })
            }
        })
    })
}
