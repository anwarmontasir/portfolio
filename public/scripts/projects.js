'use strict';

var app = app || {};

(function (module) {
  function Project(portfolioProjectsObj) {
    Object.keys(portfolioProjectsObj).forEach(key => this[key] = portfolioProjectsObj[key]);
  }

  Project.all = [];

  Project.prototype.toHtml = function () {
    const template = Handlebars.compile( $('#project-template').text());
    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
    this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';
    return template(this);
  };

  Project.loadAll = portfolioProjects => {
    portfolioProjects.sort((a,b) => (new Date(b.publishedOn)) - (new Date(a.publishedOn)));
    Project.all = portfolioProjects.map(ele => new Project(ele));
  };

  Project.fetchAll = callback => {
    $.get('./data/portfolioProjects.json').then(
      results => {
        Project.loadAll(results);
        callback();
      }
    )
  };

  module.Project = Project;
}(app));