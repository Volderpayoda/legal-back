var app =angular.module("legal",['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
$stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html'
        })
        .state('ordenanzas', {
                url: '/ordenanzas',
                controller:"ordenanzas-ctrl",
                templateUrl: 'templates/ordenanzas.html'
                
            })
        ;

    $urlRouterProvider.otherwise('/home');
});
