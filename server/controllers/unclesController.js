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

unclesController.editUncle = (req, res, next) => {
  const id = req.params.id
  const { name, age, intro } = req.body;
  const inputs = [name, age, intro, id];
  const queryStr = 'UPDATE uncles SET name = $1, age = $2, intro = $3 WHERE _id = $4 RETURNING *;';
  db.query(queryStr, inputs)
  .then(result => {
    res.locals.uncle = result.rows[0];
    return next();
  })
  .catch((err) => next({
    log: 'Error',
    message: { err: 'Error: unclesController.editUncle' }
  }))
}

unclesController.deleteUncle = (req, res, next) => {
  const id = [req.params.id];
  const queryStr = 'DELETE FROM uncles WHERE _id = $1 RETURNING *;'
  db.query(queryStr, id)
  .then(result => {
    res.locals.deleted = result.rows[0];
    return next()
  })
  .catch((err) => next({
    log: 'Error',
    message: { err: 'O to to, unclesController.deleteUncle'}
  }));
}

module.exports = unclesController;