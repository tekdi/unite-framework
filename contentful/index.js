const express = require('express');
const app = express();
const cockpit = require('./routes/cockpit');
const contentful = require('./routes/contentful');

const port = '3004';

app.use('/api/cockpit', cockpit);
app.use('/api/contentful', contentful);

app.get('/', (req, res) => {
    res.send(`Listing on PORT ${port}`);
});

app.listen(port, () => { console.log(`Listing on PORT ${port}`)});