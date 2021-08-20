const PG_URI = 'postgres://dynwtdpc:HlipO1EE5K0j4G4YP_ztfVrg384b2MJo@chunee.db.elephantsql.com/dynwtdpc';
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: PG_URI
});

const db = { 
  query: (text, params, callback) => {
  console.log('executed query', text);
  return pool.query(text, params, callback);
  }
};

module.exports = db;