'use strict';
var app = app || {};

(function(module) {
  const projectsController = {};
  projectsController.init = () => {
    $( 'nav ul li a').removeAttr('id', 'current');
    $( 'nav ul li:nth-child(2) a').attr('id', 'current');
    app.Project.fetchAll(app.projectsView.initIndexPage);
  }
  module.projectsController = projectsController;
})(app);
