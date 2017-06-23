'use strict';
var app = app || {};

(function(module) {
  const bioView = {};
  console.log('are goon = '+app.repos);

  let repoRender = Handlebars.compile($('#repo-template').text());
  let userRender = Handlebars.compile($('#user-template').text());

  bioView.userIndex = function() {
    $('#bio-user').append(
      app.user.all.map(userRender)
    );
  };

  bioView.repoIndex = function() {
    $('#bio-repo').append(
      app.repos.with('name').map(repoRender)
    );
  };

  module.bioView = bioView;
})(app);
