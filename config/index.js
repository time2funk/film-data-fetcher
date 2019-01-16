// config/index.js

const fs = require('fs');
var path = require('path');


try {
    const fileName = "./config.json";
    const pathFile = path.resolve(__dirname, fileName);
    const rawdata = fs.readFileSync(pathFile);
    const config = JSON.parse(rawdata);  
    module.exports = config;
} catch (e) {
    throw new Error(`config: ${e}`);
}