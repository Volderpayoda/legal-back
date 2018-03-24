app.controller('logout-ctrl', function($scope, $state, AuthService){
    $scope.logout = function(){
        AuthService.logout().then(function(){
            $state.go('login');
        });
    };
});