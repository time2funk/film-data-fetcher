// src/server/index.js

const Server = require('./server');

let server = null;

const close = () => {
    try {
        if (server) server.close();
        server = null;
        console.log(`( Server ) closed`);
    } catch (e) {
        throw new Error(`close: ${e}`);
    }
}

const create = async () => {
    try {
        if (!server) { // singletor
            server = new Server();
            return server.get();
        } else return server.get();
    } catch (e) {
        throw new Error(`create: ${e}`);
    }
}

module.exports = {
    create,
    close
}
