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
  $newProject.find('h2').html(this.title);
  $newProject.find('img').attr({
    'src': this.projectImg,
    'alt': this.imgCaption
  });
  $newProject.find('.article-body').html(this.body);
  $newProject.find('time').attr('datetime', this.publishedOn); 

  // Display the date as a relative number of 'days ago'
  var daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  $newProject.find('time').html('about ' + daysAgo + ' days ago');
  return $newProject;
};

portfolioProjects.sort(function(a,b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

portfolioProjects.forEach(function(projectObject) {
  // REVIEW: Take a look at this forEach method; This may be the first time we've seen it.
  projects.push(new Project(projectObject));
  console.log(projects);
});

projects.forEach(function(project) {
  $('#projects').append(project.toHtml());
});
