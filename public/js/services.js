app.factory('AuthService', function ($q,$timeout,$http, direccion) {
  
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
        var data = {
            username: username,
            password: password
        };
        // enviar un "POST" al servidor
        $http.post(direccion + "/api/usuarios/login", JSON.stringify(data))
        .then(function(response){
            if (response.status === 200){
                user = true;
                deferred.resolve();
            } else {
                user = false; 
                deferred.reject()
            }
        }, function(response){
           user = false; 
           deferred.reject()
        });

        // devuelve objeto "promise"
        return deferred.promise;
    }

    function getUserStatus() {
        return $http.get(direccion + '/api/usuarios/status')
        .then(function(response){
            if(response.data.status) {
                user = true;
            } else {
                user = false;
            }
        }, function() {
            user = false;
        }
    )
    }

    function logout() {
        // crear una nueva instancia de "deferred"
        var deferred = $q.defer();

        // send a get request to the server
        $http.get($location.protocol() + "://" + location.host() + '/api/usuarios/logout')
        // manejar exito
        .then(function (data) {
            user = false;
            deferred.resolve();
        }, function(data) {
            user = false;
            deferred.reject();
        });

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
