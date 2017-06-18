'use strict';

var app = app || {};

(function (module) {
  const pageView = {};

  pageView.handleMainNav = function () {
    $('nav ul li a').on('click', function () {
      event.preventDefault();
      $('nav ul li a').removeAttr('id', 'current');
      $(this).attr('id', 'current');
      var $whereToGo = $(this.hash);
      $('.page-section').fadeOut('fast');
      $($whereToGo).fadeIn('slow');
    });
  };

  pageView.setTeasers = function () {
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

  pageView.initIndexPage = function () {
    app.Project.all.forEach(a => $('#project-content').append(a.toHtml()));
    pageView.handleMainNav();
    pageView.setTeasers();
  };

  module.pageView = pageView;
}(app));