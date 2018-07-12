const { Pool } = require('pg')
const connectionString = DATABASE_URL;

const pool = new Pool({
  connectionString: connectionString
})

module.exports = {
  query: function(text, params, callback) {
    const start = Date.now()
    return pool.query(text, params, function(err, results) {
      const duration = Date.now() - start
      console.log('executed query', { text, params, duration})
      callback(err, results)
    })
  }
}