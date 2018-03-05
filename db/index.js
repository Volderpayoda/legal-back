const { Pool } = require('pg')

const pool = new Pool()

module.exports = {
  query: function(text, params, callback) {
    const start = Date.now()
    return pool.query(text, params, function(err, results) {
      const duration = Date.now() - start
      console.log('executed query', { text, duration, rows: results.rowCount })
      callback(err, results)
    })
  }
}