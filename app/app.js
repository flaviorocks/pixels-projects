'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'infinite-scroll',
  'myApp.projects',
  'myApp.people',
  'myApp.version'
])
  .constant('underscore', _)
  .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/projects'});
}]);
