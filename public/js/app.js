var app =angular.module("legal",['ui.router']);
app.constant('direccion', location.protocol() + '://' + location.host())
app.config(function($stateProvider, $urlRouterProvider){
$stateProvider
    .state('login', {
        url:'/login',
        views:{
            'nav':{
            },
            'content':{
                templateUrl: 'templates/login.html',
                controller: 'login-ctrl'},
        },
        access: {restricted: false}
        })
    
    .state('logout', {
        url:'/logout',
        controller: 'logout-ctrl',
        access: {restricted: true}
    })
    
    .state('home', {
        url: '/home',
        views:{
            'nav':{
                templateUrl: 'templates/nav.html',
                controller:'logout-ctrl'
            },
            'content':{
                templateUrl: 'templates/home.html'
            }
        }, 
        access: {restricted: true}
        })

    .state('ordenanzas', {
        url: '/ordenanzas',
        views:{
            'nav':{
                templateUrl:'templates/nav.html',
                controller:'logout-ctrl'
            },
            'content':{
                templateUrl: 'templates/ordenanzas.html',
                controller:"ordenanzas-ctrl",
            },
        },
        access: {restricted: true}      
        })

    .state('submit', {
        url: '/submit',
        views:{
            'nav':
            {
                templateUrl:'templates/nav.html',
                controller:'logout-ctrl'
            },
            'content':{
                templateUrl: 'templates/submit.html',
            }
        },
        access: {restricted: true}
        })

    .state('alta-ordenanzas', {
        url: '/alta-ordenanzas',
        views:{
            'nav':
            {
                templateUrl:'templates/nav.html',
                controller:'logout-ctrl'
            },
            'content':{
                templateUrl: 'templates/alta-ordenanzas.html',
                controller:"alta-ordenanzas-ctrl",
            }
        },
        access: {restricted: true}
        })

    .state('modif-ordenanzas', {
        url: '/modif-ordenanzas',
        views:{
            'nav':
            {
                templateUrl:'templates/nav.html',
                controller:'logout-ctrl'
            },
            'content':{
                templateUrl: 'templates/modif-ordenanzas.html',
                controller:"modif-ordenanzas-ctrl",
            }
        },
        access: {restricted: true}           
        })
;
    $urlRouterProvider.otherwise('/login');
});

app.run(function($rootScope, $state, AuthService){
    $rootScope.$on('$stateChangeStart',
    function(event, next, current){
        AuthService.getUserStatus().then(function() {
            if (AuthService.isLoggedIn() === false && next.access.restricted) {
                event.preventDefault();
                $state.go('login');
            }
        })
    }
);
});