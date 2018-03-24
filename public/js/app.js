var app =angular.module("legal",['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
$stateProvider
    .state('login', {
        url:'/login',
        templateUrl: 'templates/login.html',
        controller: 'login-ctrl',
        access: {restricted: false}
        })
    .state('logout', {
        url:'/logout',
        controller: 'logout-ctrl',
        access: {restricted: true}
    })
    .state('home', {
        url: '/home',
        templateUrl: 'templates/home.html',
        controller:'logout-ctrl',
        access: {restricted: true}
        })
    .state('ordenanzas', {
        url: '/ordenanzas',
        templateUrl: 'templates/ordenanzas.html',
        controller:"ordenanzas-ctrl",
        access: {restricted: true}      
        })
    .state('submit', {
        url: '/submit',
        templateUrl: 'templates/submit.html',
        access: {restricted: true}
        })
    .state('alta-ordenanzas', {
        url: '/alta-ordenanzas',
        templateUrl: 'templates/alta-ordenanzas.html',
        controller:"altaOrdenanzasCtrl",
        access: {restricted: true}
        })
    .state('modif-ordenanzas', {
        url: '/modif-ordenanzas',
        templateUrl: 'templates/modif-ordenanzas.html',
        controller:"modifOrdenanzasCtrl",
        access: {restricted: true}           
        })
;
    $urlRouterProvider.otherwise('/login');
});

app.run(function($rootScope, $state, AuthService){
    $rootScope.$on('$stateChangeStart',
    function(event, next, current){
        if (AuthService.isLoggedIn() === false && next.access.restricted) {
            alert("redirigiendo");
            $state.go('home');
        }
    }
);
});