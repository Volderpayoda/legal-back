app.controller("ordenanzas-ctrl", function($scope, $http){
    $http.get("NOMBREJSON")
    .then(function(response){
        $scope.ordenanzas = response.data.records; 
    });
});