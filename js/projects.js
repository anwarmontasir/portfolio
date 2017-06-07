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
  var templateFiller = Handlebars.compile( $('#project-template').html());
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';
  var filledTemplate = templateFiller(this);
  console.log('filledTemplate' + filledTemplate);
  return filledTemplate;
};

portfolioProjects.sort(function(a,b) { // eslint-disable-line
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

portfolioProjects.forEach(function(projectObject) { // eslint-disable-line
  // REVIEW: Take a look at this forEach method; This may be the first time we've seen it.
  projects.push(new Project(projectObject));
});

projects.forEach(function(project) {
  $('#project-content').append(project.toHtml());
});