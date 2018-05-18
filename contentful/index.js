const express = require('express');
const app = express();
const contentful = require('contentful');
const services = require('./service');

const port = '3003';

app.get('/api/menus', (req, res) => {

    // Get menus API
    services.deliveryClient.getEntries({
        content_type: 'menus',
        locale: 'en-US',
        order: '-sys.createdAt',
        include: 1 
    }).then((response) => {
        let data = [];
        response.items.forEach(element => {
            data.push(element.fields);    
        });
        res.send(data);
    }).catch((err) => console.log(err));
    let slug = '';

    // Get widgets API
    services.deliveryClient.getEntries({
        content_type: 'widgetAssignments',
        'fields.id': slug,
        locale:'en-US',
        include: 2
      }).then((response) => {
        console.log("WIDGETS ASSIGNMENTS");
        // console.log(response.items[0]);
        res.send(response);
    }).catch((err) => console.log(err));
});

app.listen(port, () => { console.log(`Listing on PORT ${port}`)});