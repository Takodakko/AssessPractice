const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const routes = require('./routes/api.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../' ))); 

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

app.use('/api', routes);

module.exports = app;