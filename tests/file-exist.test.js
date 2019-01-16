const assert = require('chai').assert;
const fs = require('fs');


describe('Config Files', function(){

		it('package.json should exist', async function(){
            const file = 'package.json';
            fs.access(file, fs.constants.F_OK, (err) => {
                assert.isOk(!err);
            });
		});

		it('config/config.json should exist', async function(){
            const file = 'config/config.json';
            fs.access(file, fs.constants.F_OK, (err) => {
                assert.isOk(!err);
            });
		});

});

