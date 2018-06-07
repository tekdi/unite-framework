const express = require('express');
const router = express.Router();
const contentful = require('contentful');
const services = require('./service');

// Get specified collection data
router.get('/:collection', (req, res) => {
    services.deliveryClient.getEntries({
        content_type: req.params.collection,
        locale: 'en-US',
        order: '-sys.createdAt',
        include: 1 
    }).then((response) => {
        let items = [];
        response.items.forEach(element => {
            items.push(element.fields); 
        });
        res.send(items);
    }).catch((err) => console.log(err));
});

module.exports = router;