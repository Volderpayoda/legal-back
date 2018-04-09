
app.controller("nav-ctrl", function($scope, AuthService){
    if (AuthService.IsLoggedIn()===true){
        $scope.nav = true;
    }
})
