app.controller("modif-ordenanzas-ctrl", function($scope, $http, $state) {
    $scope.buscarOrdenanza = function(nro_actsimple) {
    $http.get("http://volderpayoda.sytes.net/api/ordenanzas/"+nro_actsimple)
   .then(function(response){
       if (response.status == 404) {
            $state.go('submit');
        } else {
            $scope.ordenanza = response.data; 
            $scope.var = true;
        }
   }, function(response){
       $scope.ordenanza = "ERROR: Algo falló";
   });
};
   $scope.put =  function(ordenanza) {
       var data = {
       nro_ordenanza: ordenanza.nro_ordenanza, 
       tema: ordenanza.tema, 
       promulgacion: ordenanza.promulgacion, 
       fecha_promulgacion: ordenanza.fecha_promulgacion, 
       nro_promulgacion: ordenanza.nro_promulgacion, 
       nro_actsimple: ordenanza.nro_actsimple, 
       origen: ordenanza.origen,
       sub: [ 
           ordenanza.sub1,
           ordenanza.sub2,
           ordenanza.sub3,
           ordenanza.sub4,
           ordenanza.sub5,
           ordenanza.sub6,
           ordenanza.sub7,
           ordenanza.sub8,
           ordenanza.sub9,
           ordenanza.sub10,
           ordenanza.sub11,
           ordenanza.sub12,
           ordenanza.sub13,
           ordenanza.sub14,
           ordenanza.sub15,
           ordenanza.sub16,
           ordenanza.sub17,
           ordenanza.sub18,
           ordenanza.sub19,
           ordenanza.sub20,
           ordenanza.sub21,
           ordenanza.sub22,
           ordenanza.sub23,
           ordenanza.sub24,
           ordenanza.sub25,
           ordenanza.sub26,
           ordenanza.sub27
        ]    
       }
   $http.put("http://volderpayoda.sytes.net/api/ordenanzas/" + ordenanza.nro_actsimple,JSON.stringify(data)).then(function(data){
       $state.go('submit')
   }), function(data) {
       $scope.msg="ERROR: No pudimos modificar la ordenanza. Algo falló"
   }
   }
    });
