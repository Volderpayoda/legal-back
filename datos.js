var seq = 0; //sacar
var ordenanzas = []; //reemplazar con archivo de bd

var { Pool } = require('pg');
var pool = new Pool();


module.exports = {
    ordenanzas: {
        selectAll: function (callback) {
           pool.query("select * from ordenanzas", function(err, res) {
             if (err) {
               callback(err);
               return
             }
             callback(null, results.rows);
           }); 
        },
        insert: function (ordenanza, callback) {
            var _id = "ID" + seq++;
            ordenanza._id = _id;
            ordenanzas.push(ordenanza);

            callback(null, _id);
        },
        select: function(_id, callback) {
            var encontrados = ordenanzas.filter(function(ordenanza){
                return ordenanza._id === _id;
            });

            if(!encontrados.length) {
                callback(null,null);
                return;
            }
            callback(null, encontrados[0]);
        },
        //TODO: delete

        //TODO: update
    }
}

