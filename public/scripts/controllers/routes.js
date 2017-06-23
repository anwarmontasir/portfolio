'use strict';
var app = app || {};
// Configure routes for this app with page.js, by registering each URL your app can handle, linked to a single controller function to handle it.
page('/', app.bioController.init);
page('/projects', app.projectsController.init);
page('/resume', app.resumeController.init)
// activate page.js
page();