app.factory('AuthService', function ($q,$timeout,$http) {
    var data = {
        holaMundo: function(){
            return true;
        }
    }
   
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
        .then(function(data, status) {
            if (status === 200 && data.status) {
                user = true;
                deferred.resolve();
                return true;
            } else {
                user = false;
                deferred.reject();
            }
        }), function(data) {
            user = false;
            deferred.reject();
        };

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
        .then(function (data) {
            user = false;
            deferred.resolve();
        }), function(data) {
            user = false;
            deferred.reject();
        };

        //devuelve el objeto "promise"
        return deferred.promise;
    }
  
    return ({
      isLoggedIn: isLoggedIn,
      login: login,
      getUserStatus: getUserStatus,
      logout: logout,
    });
    

});
