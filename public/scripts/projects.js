'use strict';

function Project (portfolioProjectsObj) {
  this.title = portfolioProjectsObj.title;
  this.category = portfolioProjectsObj.category;
  this.projectUrl = portfolioProjectsObj.projectUrl;
  this.projectImg = portfolioProjectsObj.projectImg;
  this.imgCaption = portfolioProjectsObj.imgCaption;
  this.publishedOn = portfolioProjectsObj.publishedOn;
  this.body = portfolioProjectsObj.body;
}

// instead of a global 'projects = []' array, track the list of all projects directly on the constructor function.
Project.all = [];

Project.prototype.toHtml = function() {
  let template = Handlebars.compile( $('#project-template').text());
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';
  return template(this);
};

Project.loadAll = function(portfolioProjects) {
  portfolioProjects.sort(function(a,b) {
    // REVIEW: Take a look at this sort method; This may be the first time we've seen it.
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  portfolioProjects.forEach(function(projObj) {
    // REVIEW: Take a look at this forEach method; This may be the first time we've seen it.
    Project.all.push(new Project(projObj));
  });
}

Project.runWhenDone = function (data) {
  localStorage.setItem('projectData', JSON.stringify(data));
  Project.loadAll( data );
  pageView.initIndexPage(); // eslint-disable-line
}

Project.runWhenErr = function ( err ) {
  console.error( 'error', err );
}

Project.getDBData = function () {
  $.ajax({
    type: 'GET',
    url: './data/portfolioProjects.json',
    success: Project.runWhenDone,
    error: Project.runWhenErr
  })
}

Project.checkETag = function () {
  $.ajax({
    type: 'HEAD',
    url: './data/portfolioProjects.json',
    success: Project.validateETag,
    error: Project.runWhenErr
  })
}

Project.validateETag = function(data, message, xhr) {
  var eTag = xhr.getResponseHeader('ETag');
  if ( eTag === JSON.parse(localStorage.getItem('lsETag'))){
    Project.loadAll( JSON.parse(localStorage.projectData) )
    pageView.initIndexPage(); // eslint-disable-line
  } else {
    localStorage.setItem('lsETag', JSON.stringify(eTag));
    Project.getDBData();
  }
}