// src/server/server.js

const express = require('express');
const favicon = require('serve-favicon');
const reactViews = require('express-react-views');
const http = require('http');

const config = require('../../config');
const router = require('./router');


module.exports = class Server {
    constructor () {
        try {
            this.server = express();

            this.server.set('port', config.server.port);
            this.server.set('views', `src/client/views`);
            this.server.set('view engine', 'jsx');
            this.server.engine('jsx', reactViews.createEngine());

            // Express Middleware
            this.server.use(favicon(`src/client/public/favicon.ico`));
            this.server.use(express.static(`src/client/public`));
            this.server.use(express.json({limit: '5mb'}));
            this.server.use(express.urlencoded({ 
                extended: false,
                limit: '5mb', 
                parameterLimit: 5000 
            }));

            // Express Router
            this.server.use('/', router);

            // Server Error Handler 
            this.server.use(function(err, req, res, next) {
                console.error(err.stack);
                res.status(500).send('Something went wrong!');
            });

            // Server Listening
            http.createServer(this.server)
                .listen(this.server.get('port'), () => {
                    console.log('( Server ) running on port', this.server.get('port'));
                });
        } catch (e) {
            throw new Error(`constructor: ${e}`);
        }
    }

    get () {
        return this.server;
    }

    close () {
        try {
            if (this.server.close) 
                this.server.close();
        } catch (e) {
            throw new Error(`close: ${e}`);
        }
    }
}


// module.exports = server;
