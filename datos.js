var seq = 0; //sacar
var ordenanzas = []; //reemplazar con archivo de bd

module.exports = {
    ordenanzas: {
        selectAll: function (callback) {
            callback(null, ordenanzas);
        },
        insert: function (ordenanza, callback) {
            var _id = "ID" + seq++;
            ordenanza._id = _id;
            ordenanzas.push(ordenanza);

            callback(null, _id);
        },
        select: function(_id, callback) {
            var encontrado = ordenanzas.find(function(ordenanza){
                return ordenanza._id = _id;
            });
            callback(null, encontrado);
        },
        //TODO: delete

        //TODO: update
    }
}

