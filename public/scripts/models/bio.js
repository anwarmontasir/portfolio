'use strict';
var app = app || {};

(function (module) {
  const user = {};

  user.all = [];

  user.requestUser = function (callback) {
    $.get('github/user')
    .then(data => user.all.push(data), err => console.error(err))
    .then(callback);
  }
  module.user = user;

  const repos = {};

  repos.all = [];

  repos.requestRepos = function(callback) {
    $.get('github/user/repos')
    .then(data => repos.all = data, err => console.error(err))
    .then(callback);
  };

  repos.with = attr => repos.all.filter(repo => repo[attr]);

  module.repos = repos;
})(app);
