app.controller("alta-ordenanzas-ctrl", function($scope, $http, $state) {

    $scope.postdata = function(ordenanza) {
        
        var data = {
            nroOrdenanza: ordenanza.nro_ordenanza, 
            tema: ordenanza.tema, 
            promulgacion: ordenanza.promulgacion, 
            fechaPromulgacion: ordenanza.fecha_promulgacion, 
            nroPromulgacion: ordenanza.nro_promulgacion, 
            nroActSimple: ordenanza.nro_actsimple, 
            origen: ordenanza.origen, 
            reglamentada: ordenanza.reglamentada,
            sub:[ordenanza.sub1, ordenanza.sub2, ordenanza.sub3,
                ordenanza.sub4, ordenanza.sub5, ordenanza.sub6,
                ordenanza.sub7, ordenanza.sub8, ordenanza.sub9,
                ordenanza.sub10, ordenanza.sub11, ordenanza.sub12,
                ordenanza.sub13, ordenanza.sub14, ordenanza.sub15,
                ordenanza.sub16, ordenanza.sub17, ordenanza.sub18,
                ordenanza.sub19, ordenanza.sub20, ordenanza.sub21,
                ordenanza.sub22, ordenanza.sub23, ordenanza.sub24,
                ordenanza.sub25, ordenanza.sub26, ordenanza.sub27,]
        };
    
    $http.post("http://volderpayoda.sytes.net/api/ordenanzas", JSON.stringify(data))
        .then(function(data){
            $state.go('submit');    
        }), function(data){
        $scope.msg = "ERROR: No pudimos enviar tu ordenanza"}
}});