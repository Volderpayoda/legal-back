angular.module('legal').factory('AuthService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    // crear variable "usuario"
    var user = null;

    // prepara las funciones de usuario para usar en los controladores
    function isLoggedIn() {
        if(user) {
            return true;
        }
        else {
            return false;
        }
    }

    function login(username, password) {
        // crear una nueva instancia de "deferred"
        var deferred = $q.defer();
        
        // enviar un "POST" al servidor
        $http.post('http://volderpayoda.sytes.net/api/usuarios/login', {username: username, password: password})
        // manejar éxito
        .success(function(data, status) {
            if (status === 200 && data.status) {
                user = true;
                deferred.resolve();
            } else {
                user = false;
                deferred.reject();
            }
        })
        // manejar error
        .error(function (data) {
            user = false;
            deferred.reject();
        });

        // devuelve objeto "promise"
        return deferred.promise;
    }

    function getUserStatus() {
        return user;
    }

    function logout() {
        // crear una nueva instancia de "deferred"
        var deferred = $q.defer();

        // send a get request to the server
        $http.get('http://volderpayoda.sytes.net/api/usuarios/logout')
        // manejar exito
        .success(function (data) {
            user = false;
            deferred.resolve();
        })
        // manejar error
        .error(function(data) {
            user = false;
            deferred.reject();
        });

        //devuelve el objeto "promise"
        return deferred.promise;
    }
          
    return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register
    });

}]);