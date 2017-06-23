'use strict';
var app = app || {};

(function(module) {
  const resumeController = {};
  resumeController.init = () => {
    $( '.page-section' ).fadeOut('fast');
    $( '#resume' ).fadeIn('slow');
    $( 'nav ul li a').removeAttr('id', 'current');
    $( 'nav ul li:nth-child(3) a').attr('id', 'current');
  }
  module.resumeController = resumeController;
})(app);
