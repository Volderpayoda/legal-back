app.controller('login-ctrl', function ($scope, $state, AuthService) {

   
    $scope.login = function () {
        // initial values
        $scope.error = false;
        $scope.disabled = true;
        // call login from service
        AuthService.login($scope.loginForm.username, $scope.loginForm.password).then(function () {
            $scope.msg="aca";
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