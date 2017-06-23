'use strict';
var app = app || {};

(function(module) {
  const bioController = {};
  bioController.init = () => {
    $( '.page-section' ).fadeOut('fast');
    $( '#bio' ).fadeIn('slow');
    $( 'nav ul li a').removeAttr('id', 'current');
    $( 'nav ul li:nth-child(1) a').attr('id', 'current');
  }
  module.bioController = bioController;
})(app);
