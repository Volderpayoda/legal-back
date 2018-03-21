app.controller("modifOrdenanzasCtrl", function($scope, $http, $state) {
    $scope.buscarOrdenanza = function(nroActSimple) {
    $http.get("http://volderpayoda.sytes.net/api/ordenanzas/"+nroActSimple)
   .then(function(response){
       $scope.msg="hasta aca llego"
       $scope.ordenanza = response.data; 
       $scope.var = true;
   }, function(response){
       $scope.ordenanza = "algo fallo";
   });
};
   $scope.put =  function(ordenanza) {
       var data = {
       nroOrdenanza: ordenanza.nroOrdenanza, 
       tema: ordenanza.tema, 
       promulgacion: ordenanza.promulgacion, 
       fechaPromulgacion: ordenanza.fechaPromulgacion, 
       nroPromulgacion: ordenanza.nroPromulgacion, 
       observacion: ordenanza.observacion, 
       nroActSimple: ordenanza.nroActSimple, 
       presento: ordenanza.presento,
       sub: { 
           num1: ordenanza.sub1,
           num2: ordenanza.sub2,
           num3: ordenanza.sub3,
           num4: ordenanza.sub4,
           num5: ordenanza.sub5,
           num6: ordenanza.sub6,
           num7: ordenanza.sub7,
           num8: ordenanza.sub8,
           num9: ordenanza.sub9,
           num10: ordenanza.sub10,
           num11: ordenanza.sub11,
           num12: ordenanza.sub12,
           num13: ordenanza.sub13,
           num14: ordenanza.sub14,
           num15: ordenanza.sub15,
           num16: ordenanza.sub16,
           num17: ordenanza.sub17,
           num18: ordenanza.sub18,
           num19: ordenanza.sub19,
           num20: ordenanza.sub20,
           num21: ordenanza.sub21,
           num22: ordenanza.sub22,
           num23: ordenanza.sub23,
           num24: ordenanza.sub24,
           num25: ordenanza.sub25,
           num26: ordenanza.sub26,
           num27: ordenanza.sub27,
       }    
       }
   $http.put("http://volderpayoda.sytes.net/api/ordenanzas/" + ordenanza._id,JSON.stringify(data)).then(function(data){
       $state.go('submit')
   }), function(data) {
       $scope.msg="ERROR: No pudimos modificar la ordenanza. Algo falló"
   }
   }
    });
