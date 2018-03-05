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
        .state('exito', {
                    url: '/exito',
                    templateUrl: 'templates/exito.html',
                })
        ;

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
    var data = {nroOrdenanza: ordenanza.nroOrdenanza, tema: ordenanza.tema, promulgacion: ordenanza.promulgacion, fechaPromulgacion: ordenanza.fechaPromulgacion, nroPromulgacion: ordenanza.nroPromulgacion, observacion: ordenanza.observacion, nroActSimple: ordenanza.nroActSimple, presento: ordenanza.presento, reglamentada: ordenanza.reglamentada}
    $http.post("http://volderpayoda.sytes.net/api/ordenanzas", JSON.stringify(data)).success(function(data){
    $scope.data = "exito" //0
    $state.go('exito')
    
    })
   }
 });

app.controller("modifOrdenanzasCtrl", function($scope, $http) {
  $scope.url = ''; // donde tiene que buscar

    // The function that will be executed on button click (ng-click="search()")
    $scope.search = function() {
        // Create the http post request
        // the data holds the keywords
        // The request is a JSON request.
        $http.post($scope.url, { "data" : $scope.keywords}).
        success(function(data, status) {
            $scope.status = status;
            $scope.data = data;
            $scope.result = data; // Show result from server in our <pre></pre> element
        })
        .
        error(function(data, status) {
            $scope.data = data || "Request failed";
            $scope.status = status;
        });
    };
});
