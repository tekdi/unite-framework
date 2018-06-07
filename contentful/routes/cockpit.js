const express = require('express');
const router = express.Router();
require('isomorphic-fetch');

const config = {
    token: 'fb20022be1ea986f981a1e06e378fc'
};

const rootUrl = 'http://ttpllt16-php71.local/cockpit';

router.get('/', (req, res) => {
    fetch(rootUrl + '/api/collections/get/client_testimony?token=' + config.token , {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            filter: {published:true},
            limit: 10,
            skip: 5,
            sort: {_created:-1},
            populate: 1 // resolve linked collection items
        })
    })
    .then(response => response.json())
    .then((response) => {
        res.send(response.entries);
    });
});

// End of the module make the router public
module.exports = router;