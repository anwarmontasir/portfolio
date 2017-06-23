'use strict';
const pg = require('pg');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();
const conString = 'postgres://localhost:5432';
const client = new pg.Client(conString);
client.connect();
client.on('error', err => console.error(err));
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));
app.get('/', (req, res) => {
  res.sendFile('index.html', {root: './public'});
});
app.get('*', function(request, response) {
  response.sendFile('index.html', {root: './public'});
});
app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));