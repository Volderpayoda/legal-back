app.controller("ordenanzas-ctrl", function($scope, $http, direccion) {
    $http.get(direccion + "/api/ordenanzas")
     .then(function(response){
         $scope.ordenanzas = response.data.rows; 
     }, function(response){
         $scope.ordenanzas = "algo fallo";
     });
 });