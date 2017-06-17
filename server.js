'use strict';

// Initialize your project using NPM to create and populate a package.json file
const express = require('express');
// instantiate express so we can use its functionality
const app = express();
// Require the Express package that you installed via NPM, and instantiate the app
// Remember to install express, and be sure that it's been added to your package.json as a dependency
// There is also a package here called body-parser, which is required in for use in a new route.
// Be sure to install that and save it as a dependency after you create your package.json.
const bodyParser = require('body-parser').urlencoded({extended: true});
const PORT = process.env.PORT || 3000;

// Include all of the static resources as an argument to app.use()

// define which directory we will serve our files from
app.use(express.static('./public'));

app.get('*', function(request, response) {
  response.status('404').sendFile('/public/404.html', {root: '.'});
});

app.listen(PORT, function() {
  // DONE: Log to the console a message that lets you know which port your server has started on
  console.log(`listening on ${PORT}`);
});
