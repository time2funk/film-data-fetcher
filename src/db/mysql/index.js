// src/db/mysql/index.js

const Mysql = require('./mysql');
const schemaInit = require('./init').schemaInit;
const tableInit = require('./init').tableInit;

const create = (config) => {
    try {
        if (!config) throw new Error(`no config specified`);
        return new Mysql(config);
    } catch (e) {
        throw new Error(`create: ${e}`);
    }
}

const init = async (config) => {
    try {
        if (!config) throw new Error(`no config specified`);
        await schemaInit(config); 
        await tableInit(config);
    } catch (e) {
        throw new Error(`init: ${e}`);
    }
}

module.exports = {
    create,
    init
};