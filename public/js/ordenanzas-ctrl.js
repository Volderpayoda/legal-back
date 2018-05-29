app.controller("ordenanzas-ctrl", function($scope, $http) {
    $http.get("http://wae.sytes.net/api/ordenanzas")
     .then(function(response){
         $scope.ordenanzas = response.data.rows; 
     }, function(response){
         $scope.ordenanzas = "algo fallo";
     });
 });