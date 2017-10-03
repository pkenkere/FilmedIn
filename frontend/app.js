var app  = angular.module("FilmedIn", ['ngRoute']);
app.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider.
        when('/login', {
            title: 'Login',
            templateUrl: 'frontend/profile.html',
        })
        when('/signup', {
          title: 'SignUp',
          templateUrl: 'frontend/profile.html'
        })
      }])
