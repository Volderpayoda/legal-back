app.controller('login-ctrl', function ($scope, $state, AuthService) {

    $scope.msg="aca";
    $scope.login = function () {
        // initial values
        $scope.error = false;
        $scope.disabled = true;

        // call login from service
        AuthService.login($scope.loginForm.username, $scope.loginForm.password).then(function () {
            $state.go('home');
            $scope.disabled = false;
            $scope.loginForm = {};
        }), function () {
            $scope.error = true;
            $scope.errorMessage = "Invalid username and/or password";
            $scope.disabled = false;
            $scope.loginForm = {};
      };

  };
});