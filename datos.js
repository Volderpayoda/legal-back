var seq = 0; //sacar
var ordenanzas = []; //reemplazar con archivo de bd

var pg = require('pg');

var connString = "postgres://postgres:volderpayoda96@localhost:5432/legal"

function getPgClient(callback) {
    pg.connect(connString, function (err, client, done) {
        if (err) {
            done(true);
            callback(err);
            return;
        }
        callback(null, client, done);
    });
}

function queryPg(query, callback) {
    getPgClient(function (err, client, done) {
        if (err) {
            callback(err);
            return;
        }
        client.query(query, function (err, results) {
            if (err) {
                done(true);
                callback(err);
                return;
            }
            done();
            callback(null, results);

        });
    });
};
module.exports = {
    ordenanzas: {
        selectAll: function (callback) {
            queryPg("select * from ordenanzas", function(err, results) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, results.rows);
            })
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

