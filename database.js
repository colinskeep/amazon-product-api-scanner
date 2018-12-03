const mysql = require('mysql');

require('dotenv').config();
var pool = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

exports.insert = (asin, title, brand, price, partNumber, salesRank, totalOffers, merchant, category, prime) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(Error(err))
            } else {
                var querystring = `INSERT INTO asin (asin, title, brand, price, partNumber, salesRank, totalOffers, merchant, category, prime) VALUES ('${asin}', '${title}', '${brand}', '${price}', '${partNumber}', '${salesRank}', '${totalOffers}', '${merchant}', '${category}', '${prime}') ON DUPLICATE KEY UPDATE asin='${asin}', title='${title}', brand='${brand}', price='${price}', partNumber='${partNumber}', salesRank='${salesRank}', totalOffers='${totalOffers}', merchant='${merchant}', category='${category}', prime='${prime}';`
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
