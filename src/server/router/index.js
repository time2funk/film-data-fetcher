// src/server/router/index.js

const express = require('express');

const searchRoute = require('./search');

function requestMonitor (req, res, next){
    const date = new Date(Date.now()).toLocaleDateString();
    const time = new Date(Date.now()).toLocaleTimeString();
    const log = `
        Request
            URL: ${req.originalUrl}
            Type: ${req.method}
            Time: ${date} ${time} 
    `;
    console.log(log);
    next();
}

const router = express.Router();

// request monitor 
router.use(requestMonitor);

router.get('/', (req, res) => {
    res.render('index', { title: 'Sadness' });
});

router.post('/search', searchRoute);

// Server Router
module.exports = router;
