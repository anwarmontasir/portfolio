'use strict';

require('dotenv').config();

const pg = require('pg');
const express = require('express');
const bodyParser = require('body-parser');
const requestProxy = require('express-request-proxy');
const PORT = process.env.PORT || 3000;
const app = express();
const conString = process.env.DATABASE_URL;
const client = new pg.Client(conString);
client.connect();
client.on('error', err => console.error(err));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));
function proxyGitHub( request, response ) {
  console.log( 'Routing GitHub request for', request.params[0] );
  console.log(process.env.GITHUB_TOKEN);
  ( requestProxy({
    url: `https://api.github.com/${request.params[0]}`,
    headers: {Authorization: `token ${process.env.GITHUB_TOKEN}`}
  }))(request, response);
}
app.get('/github/*', proxyGitHub);
app.get('/', (req, res) => {
  res.sendFile('index.html', {root: './public'});
});
app.get('*', function(request, response) {
  response.sendFile('index.html', {root: './public'});
});
app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));