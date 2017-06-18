'use strict';
var app = app || {};

(function(module) {
  const resumeController = {};
  resumeController.init = () => {
    $( '.page-section' ).hide();
    $( '#resume' ).show();
  }
  module.resumeController = resumeController;
})(app);
