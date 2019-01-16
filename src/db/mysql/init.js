// src/db/mysql/init.js

const mysql = require('mysql2/promise');


const schemaInit = async (config) => {
    return new Promise( async (resolve, reject) => {
        try {
            console.log('( Mysql ) init schema');
            const schema_query = `
                CREATE DATABASE IF NOT EXISTS  
                ${config.database} 
                CHARACTER SET utf8 
                COLLATE utf8_general_ci      
            `;
            const connection = await mysql.createConnection({
                host     : config.host,
                user     : config.user,
                password : config.password,
            });
            await connection.execute( schema_query, async (e, results, fields) => {
                if (e) return reject(`schemaInit: ${e}`);
                await connection.end();
                return resolve();
            });
        } catch (e) {
            reject(`schemaInit: ${e}`);
        }
    });
}

const tableInit = async (config) => {
    return new Promise( async (resolve, reject) => {
        try {
            console.log('( Mysql ) init table');
            const schema_query = `
                CREATE TABLE IF NOT EXISTS
                movies (
                    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
                    status VARCHAR(50) NOT NULL,
                    title VARCHAR(100) NOT NULL,
                    year INT(4) NOT NULL,
                    released VARCHAR(50),
                    poster INT(4),
                    country VARCHAR(50),
                    actors VARCHAR(150),
                    genre VARCHAR(150),
                    rating VARCHAR(10)
                ) ENGINE = InnoDB     
            `;
            const connection = await mysql.createConnection({
                host     : config.host,
                user     : config.user,
                password : config.password,
                database : config.database,
            });
            await connection.execute( schema_query, async (e, results, fields) => {
                if (e) return reject(`tableInit: ${e}`);
                await connection.end();
                return resolve();
            });
        } catch (e) {
            reject(`tableInit: ${e}`);
        }
    });
}


module.exports = {
    schemaInit,
    tableInit
};