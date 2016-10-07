'use strict';

angular.module('myApp.projects', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/projects', {
      templateUrl: 'app/projects/projects.html',
      controller:  'ProjectsCtrl'
    });
  }])

  .controller('ProjectsCtrl', ['$http', '$scope', 'underscore', function ($http, $scope, underscore) {

    var vm = $scope;

    activate();

    function activate() {
      getProjects();
    }

    function getProjects() {
      var url = 'https://api.github.com/repos/PixelsCamp/projects/contents/';

      return $http
        .get(url)
        .then(function (result) {
          vm.projects = underscore
            .chain(result.data)
            .filter(function (item) {
              var projectRegex = new RegExp('^project_');
              return item.type === 'file' && projectRegex.test(item.name);
            })
            .map(function (item) {
              var upDatedItem = item,
                nameSplit = item.name.split('-');

                upDatedItem.projectNumber = parseInt(nameSplit[0].split('_')[1]);
                upDatedItem.projectName = nameSplit[1].split('.')[0].split('_').join(' ');

              return upDatedItem;
            })
            .sortBy(function(item){
              return item.projectNumber;
            })
            .value();
        });
    }


  }]);