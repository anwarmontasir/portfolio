'use strict';
var app = app || {};

(function(module) {
  const bioController = {};
  bioController.init = () => {
    $( '.page-section' ).hide();
    $( '#bio' ).show();
  }
  module.bioController = bioController;
})(app);
