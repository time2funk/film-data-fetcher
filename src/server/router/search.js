// src/server/router/search.js

const config = require('../../../config');

// mysql client
const Mysql = require('../../db/mysql');
const mysql = Mysql.create(config.mysql);

// scrapper client 
const Scrapper = require('../../scrapper');
const scrapper = new Scrapper(config.omdb);


module.exports = async (req, res) => {
    try {
        const title = req.body.title;
        const year = req.body.year;

        if (!title || !year)
            res.send({status: 'err', err: 'wrong request args'});
        else {
            console.log('searching...');
            const mysql_result = await mysql.findFilmData(title, year);

            if (mysql_result.length === 0) { // no results in mysql db
                await scrapper.find(title, year, async (scrapper_result) => {
                    console.log(` - `, scrapper_result);
                    // find film-data from IMDB API
                    if (scrapper_result.Error && scrapper_result.Error === 'Movie not found!') { 
                        const data = {
                            title,
                            year,
                            status: 'NO DATA',
                            released: null,
                            poster: null,
                            country: null,
                            actors: null,
                            genre: null,
                            rating: null
                        }
                        await mysql.insertFilmData(data);

                        res.send({
                            status: 'ok', 
                            data: {
                                status: data.status
                            }
                        });
                    } else if (scrapper_result.Response && scrapper_result.Response === 'False') {
                        res.send({error: 'There was some '});
                    } else {
                        const data = {
                            title,
                            year,
                            status: 'OK',
                            released: scrapper_result.Released,
                            poster: scrapper_result.Poster,
                            country: scrapper_result.Country,
                            actors: scrapper_result.Actors,
                            genre: scrapper_result.Genre,
                            rating: scrapper_result.imdbRating
                        }
                        await mysql.insertFilmData(data);

                        res.send({status: 'ok', data: data});
                    }
                });
            } else { // data from mysql db
                res.send({status: 'ok', data: mysql_result[0]});
            }
        }
    } catch (e) {
        throw new Error(`search/: ${e}`);
    }
}