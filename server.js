'use strict';

const pg = require('pg');
// what is fs???
// const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();
const conString = 'postgres://localhost:5432';
const client = new pg.Client(conString);
client.connect();
client.on('error', function(err) {
  console.error(err);
});
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: true}));
app.get('*', function(request, response) {
  response.status('404').sendFile('/public/404.html', {root: '.'});
});
app.listen(PORT, function() {
  console.log(`listening on ${PORT}`);
});
app.use(express.static('./public'));