const db = require('../models/models.js');

// "uncles" table format
// CREATE TABLE uncles (
//     _id SERIAL PRIMARY KEY, 
//     name VARCHAR(255),
//     age INT,
//     intro VARCHAR(255)
//     );

const unclesController = {};

unclesController.getUncles = (req, res, next) => {
  const queryStr =  'SELECT * FROM uncles;';
  db.query(queryStr)
  .then(results => {
    res.locals.uncles = results.rows;
    return next();
  })
  .catch((err) => next({
    log: 'Error',
    message: { err: 'O to to, unclesController.getUncles'}
  }));
};

unclesController.postUncle = (req, res, next) => {
  const character = [req.body.name, req.body.age, req.body.intro];
  const queryStr = 'INSERT INTO uncles (name, age, intro) VALUES ($1, $2, $3);';
  db.query(queryStr, character)
  .then(results => {
    res.locals.uncles = results.rows;
    return next();
  })
  .catch((err) => next({
    log: 'Error',
    message: { err: 'O to to, unclesController.postUncle'}
  }));
};

module.exports = unclesController;