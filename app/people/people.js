'use strict';

angular.module('myApp.people', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/people', {
      templateUrl: 'app/people/people.html',
      controller:  'PeopleCtrl'
    });
  }])

  .constant('peopleConfig', {
    'pageSize': 20
  })

  .controller('PeopleCtrl', ['$http', '$scope', 'peopleConfig', function ($http, $scope, peopleConfig) {

    var vm = $scope;

    vm.loadPeople = loadPeople;

    activate();

    function activate() {
      vm.data = {
        filter: '',
        loading: false,
        offset: 0,
        people: [],
        total:  0
      };
    }

    function getPeople(offset, pageSize) {
      var url = 'https://crossorigin.me/https://api.pixels.camp/users/';

      offset = offset || 0;
      pageSize = pageSize || peopleConfig.pageSize;

      url += '?count=' + pageSize + '&offset=' + offset;

      vm.data.loading = true;

      return $http
        .get(url)
        .then(function (result) {
          return result.data;
        })
        .finally(function(){
          vm.data.loading = false;
        });
    }

    function loadPeople() {
      if (!vm.data.loading) {
        getPeople(vm.data.offset).then(function (data) {
          vm.data.total = data.total;
          Array.prototype.push.apply(vm.data.people, data.users);
          vm.data.offset += peopleConfig.pageSize;
        });
      }
    }

  }]);