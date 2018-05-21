const express = require('express');
const app = express();
const contentful = require('contentful');
const services = require('./service');

const port = '3003';

// Get menus
app.get('/api/menus', (req, res) => {
    services.deliveryClient.getEntries({
        content_type: 'menus',
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

// Get menus and routes widgets
app.get('/api/widgets', (req, res) => {
    let menuUrl = '';
    services.deliveryClient.getEntries({
        content_type: 'widgetAssignments',
        'fields.menuUrl': menuUrl,
        locale:'en-US',
        include: 2
      }).then((response) => {
        let items = {};
        response.items.forEach(item => {
            if (!(item.fields.position in items)) {
                items[item.fields.position] = { widgets: []};
            }

            items[item.fields.position].widgets.push(item.fields); 
        });
        res.send(items);
    }).catch((err) => console.log(err));
});

app.listen(port, () => { console.log(`Listing on PORT ${port}`)});