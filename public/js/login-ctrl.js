app.controller('login-ctrl', function ($scope, $state, AuthService) {

   
    $scope.login = function () {
        // initial values
        $scope.error = false;
        $scope.disabled = true;
        // call login from service
        AuthService.login($scope.loginForm.username, $scope.loginForm.password).then(function () {
            $state.go('home');
            $scope.disabled = false;
            $scope.loginForm = {};
        },function (error) {
            $scope.error = true;
            $scope.errorMessage = "Usuario y/o contraseña inválidos";
            $scope.disabled = false;
            $scope.loginForm = {};
        })

  };
});