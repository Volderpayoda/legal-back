var app =angular.module("legal",['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
$stateProvider
    .state('login', {
        url:'/login',
        templateUrl: 'templates/login.html',
        controller: 'login-ctrl'
        })
    .state('logout', {
        url:'/logout',
        controller: 'logout-ctrl'
    })
    .state('home', {
        url: '/home',
        templateUrl: 'templates/home.html'
        })
    .state('ordenanzas', {
        url: '/ordenanzas',
        templateUrl: 'templates/ordenanzas.html',
        controller:"ordenanzas-ctrl"      
        })
    .state('submit', {
        url: '/submit',
        templateUrl: 'templates/submit.html'
        })
    .state('alta-ordenanzas', {
        url: '/alta-ordenanzas',
        templateUrl: 'templates/alta-ordenanzas.html',
        controller:"altaOrdenanzasCtrl"
        })
    .state('modif-ordenanzas', {
        url: '/modif-ordenanzas',
        templateUrl: 'templates/modif-ordenanzas.html',
        controller:"modifOrdenanzasCtrl",           
        })
;
    $urlRouterProvider.otherwise('/home');
});

app.controller('login-ctrl', function ($scope, $location, AuthService) {
    $scope.msg="aca";
  $scope.login = function () {

    // initial values
    $scope.error = false;
    $scope.disabled = true;

    // call login from service
    AuthService.login($scope.loginForm.username, $scope.loginForm.password)
      // handle success
      .then(function () {
        $state.go('home');
        $scope.disabled = false;
        $scope.loginForm = {};
      })
      // handle error
      .catch(function () {
        $scope.error = true;
        $scope.errorMessage = "Invalid username and/or password";
        $scope.disabled = false;
        $scope.loginForm = {};
      });

  };

});