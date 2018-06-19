const express = require('express');
const router = express.Router();
require('isomorphic-fetch');
router.use(express.json());

const config = {
    token: 'fb20022be1ea986f981a1e06e378fc'
};

const rootUrl = 'http://ttpllt16-php71.local/cockpit';

router.get('/:collection/:slug', (req, res) => {
    fetch(rootUrl + '/api/collections/get/'+ req.params.collection +'?token=' + config.token + '&filter[_id]=' + req.params.slug, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            limit: 10,
            skip: 5,
            sort: {_created:-1},
            populate: 1 // resolve linked collection items
        })
    })
    .then(response => response.json())
    .then((response) => {
        res.send(response.entries[0]);
    });
});

router.get('/:collection', (req, res) => {
    fetch(rootUrl + '/api/collections/get/'+ req.params.collection +'?token=' + config.token , {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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

// Save specified collection data
router.post('/:collection', (req, res) => {
    fetch(rootUrl + '/api/collections/save/'+ req.params.collection +'?token=' + config.token, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            data: req.body
        })
    })
    .then(response => response.json())
    .then((entry) => {
        if (entry) {
            res.send(entry);
        } else {
            res.send(entry);
        }
    });
});

// Delete data into specified collection
router.delete('/:collection', (req, res) => {
    fetch(rootUrl + '/api/collections/remove/'+ req.params.collection +'?token=' + config.token, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            // filter: {...}
        })
    })
    .then(response = response.json())
    .then(entry => console.log(entry));
});

// End of the module make the router public
module.exports = router;