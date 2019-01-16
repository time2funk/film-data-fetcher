// src/db/mysql/mysql.js

const mysql = require('mysql2/promise');


const asyncSqlClient = async (config, cb) => {
    try {
        return await mysql.createConnection({
            host     : config.host,
            user     : config.user,
            password : config.password,
            database : config.database
        }, cb);
    } catch (e) {
        throw new Error(`asyncSqlClient: ${e}`);
    }
}

// const asyncMysqlPool = async (config, cb) => {
// 	return  await mysql.createPool({
// 		host     : config.host,
// 		user     : config.user,
// 		password : config.password,
// 		database : config.database
// 	}, cb);
// };

const exe = async (query, params, config, callback) => {
    try {
        const connection = await asyncSqlClient(config);
        const result = await connection.execute( query, params );
        connection.end();

        if(callback)
            await  callback( result, params );
        return result[0];

    } catch (e) {
        throw new Error(`exe: ${e}`);
    }
}

module.exports = class Mysql {
    constructor (config) {
        this.config = config;
        console.log(`( Mysql ) client ready`);
    }

    async findFilmData (title, year, cb) {
        try {
            if (!title || !year) throw new Error(`film title or year not specified`)
            const query = `
                SELECT *
                FROM movies
                WHERE title = ? 
                AND year = ?
            `;
            const result = await exe(query, [ title, year ], this.config);

            if (cb) cb(result);
            return result;
        } catch (e) {
            throw new Error(`findFilmData: ${e}`)
        }
    }

    async insertFilmData (data, cb) {
        try {
            if (!data) throw new Error(`film data not specified`)
            const query = `
                INSERT INTO movies (
                    status,
                    title,
                    year,
                    released,
                    poster,
                    country,
                    actors,
                    genre,
                    rating
                ) VALUES (?,?,?,?,?,?,?,?,?)
            `;
            const result = await exe(query, [ 
                data.status,
                data.title,
                data.year,
                data.released,
                data.poster,
                data.country,
                data.actors,
                data.genre,
                data.rating
             ], this.config);

            if (cb) cb(result);
            return result;
        } catch (e) {
            throw new Error(`insertFilmData: ${e}`)
        }
    }
}
