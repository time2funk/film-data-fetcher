// index.js

const cleanup = require('./src').cleanup;  


if (process.env.NODE_ENV !== 'production') 
    process.env.NODE_ENV = 'development';

process.on('SIGINT', function () {
    process.exit(2);
});

process.on('exit', function () {
    console.log(' exit event...'); 
    cleanup();
});

// Main
(async () => {
    try {
        const config = require('./config');
        const Mysql = require('./src/db/mysql');
        const Server = require('./src').Server;    

        // init mysql db
        await Mysql.init(config.mysql);

        // Server
        const server = await Server.create();

    } catch (e) {
        throw new Error(`main: ${e}`);
    }
})();

