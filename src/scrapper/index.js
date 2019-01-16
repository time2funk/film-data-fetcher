// src/scrapper/index.js

const fetch = require('node-fetch');

// OMDB API Scrapper class
module.exports = class {

    constructor (config) {
        this.config = config;
    }

    async find (_title, year, cb) {
        try {
            const title = _title.replace(' ', '+');
            const link = `http://www.omdbapi.com/?t=${title}&y=${year}&apikey=${this.config.key}`;
            await fetch(link)
                .then(res => res.json())
                .then(cb);
        } catch (e) {
            throw new Error(`find: ${e}`);
        }
    };
}