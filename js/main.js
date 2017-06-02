'use strict';

var projects = [];

function Project (portfolioProjectsObj) {
  this.title = portfolioProjectsObj.title;
  this.category = portfolioProjectsObj.category;
  this.projectUrl = portfolioProjectsObj.projectUrl;
  this.projectImg = portfolioProjectsObj.projectImg;
  this.imgCaption = portfolioProjectsObj.imgCaption;
  this.publishedOn = portfolioProjectsObj.publishedOn;
  this.body = portfolioProjectsObj.body;
}

Project.prototype.toHtml = function() {
  var $newProject = $('article.template').clone();
  $newProject.removeClass('template');

  if (!this.publishedOn) $newProject.addClass('draft');
  $newProject.data('category', this.category);

  /* $newArticle.find('address a').html(this.author);
  $newArticle.find('address a').attr('href', this.authorUrl); */
  $newProject.find('h3').html(this.title);
  $newProject.find('img').attr({
    'src': this.projectImg,
    'alt': this.imgCaption
  });
  $newProject.find('.article-body').html(this.body);
  $newProject.find('.project-link').attr('href', this.projectUrl);
  $newProject.find('time').attr('datetime', this.publishedOn); 

  // Display the date as a relative number of 'days ago'
  var daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  $newProject.find('time').html('about ' + daysAgo + ' days ago.');
  return $newProject;
};

portfolioProjects.sort(function(a,b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

portfolioProjects.forEach(function(projectObject) {
  // REVIEW: Take a look at this forEach method; This may be the first time we've seen it.
  projects.push(new Project(projectObject));
});

projects.forEach(function(project) {
  $('#project-content').append(project.toHtml());
});

var pageView = {};

pageView.handleMainNav = function () {
  $('nav ul li a').on('click',function() {
    event.preventDefault();
    $('nav ul li a').removeAttr('id', 'current');
    $(this).attr('id', 'current');
    var $whereToGo = $(this.hash);
    console.log($whereToGo);
    $('.page-section').hide();
    $($whereToGo).fadeIn(500);
  }); // Let's now trigger a click on the first .tab element, to set up the page.
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

$(document).ready(function () {
  pageView.handleMainNav();
  pageView.setTeasers();
});