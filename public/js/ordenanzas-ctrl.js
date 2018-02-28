app.controller("ordenanzas-ctrl", function($scope, $http){
    $http.get("localhost:80/api/ordenanzas")
    .then(function(response){
        $scope.ordenanzas = response.data.ordenanzas; 
    });
});