var app =angular.module("legal",['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
$stateProvider
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
                      controller:"modifOrdenanzasCtrl"
        })
  .state('editar/:nroActSimple',{
     url:'editar/:nroActSimple', 
    templateUrl:'templates/editar.html',
    controller:"editar-ctrl"
});

    $urlRouterProvider.otherwise('/home');
});

app.controller("ordenanzas-ctrl", function($scope, $http) {
   $http.get("http://volderpayoda.sytes.net/api/ordenanzas")
    .then(function(response){
        $scope.ordenanzas = response.data.rows; 
    }, function(response){
        $scope.ordenanzas = "algo fallo";
    });
});

app.controller("altaOrdenanzasCtrl", function($scope, $http) {
    $scope.postdata = function(ordenanza) {
    var data = {
        nroOrdenanza: ordenanza.nroOrdenanza, 
        tema: ordenanza.tema, 
        promulgacion: ordenanza.promulgacion, 
        fechaPromulgacion: ordenanza.fechaPromulgacion, 
        nroPromulgacion: ordenanza.nroPromulgacion, 
        observacion: ordenanza.observacion, 
        nroActSimple: ordenanza.nroActSimple, 
        presento: ordenanza.presento, 
        reglamentada: ordenanza.reglamentada}
    $http.post("http://volderpayoda.sytes.net/api/ordenanzas", JSON.stringify(data)).then(function(data){
    //$scope.msg = "exito";
    })
   }
 });
 
 app.controller("modifOrdenanzasCtrl", function($scope, $http) {
    
     $scope.buscarOrdenanza = function(nroActSimple) {
        $http.get("http://volderpayoda.sytes.net/api/ordenanzas"+nroActSimple)
    .then(function(response){
        $scope.ordenanzas = response.data; 
    }, function(response){
        $scope.ordenanzas = "algo fallo";
    });
}
     });
