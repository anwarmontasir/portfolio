'use strict';

var app = app || {};

(function (module) {
  const projectsView = {};

  projectsView.setTeasers = function () {
    $('.article-body *:nth-of-type(n+2)').hide();

    $('.read-more').on('click', function () {
      event.preventDefault();
      $(this).css('display', 'none');
      $(this).parent().find($('.show-less')).css('display', 'block');
      $(this).parent().find($('.article-body *:nth-of-type(n+2)')).fadeIn(500);

    });
    $('.show-less').on('click', function () {
      event.preventDefault();
      $(this).css('display', 'none');
      $(this).parent().find($('.read-more')).css('display', 'block');
      $(this).parent().find($('.article-body *:nth-of-type(n+2)')).hide();

    });

  };

  projectsView.initIndexPage = function () {
    app.Project.all.forEach(a => $('#project-content').append(a.toHtml()));
    projectsView.setTeasers();
    $( '.page-section' ).fadeOut('fast');
    $( '#projects' ).fadeIn('slow');
  };

  module.projectsView = projectsView;
}(app));