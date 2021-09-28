const express = require('express');
const app = express();

// Serve all the files in '/dist' directory
app.use(express.static('dist'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`App listening on port: '${PORT}' `);
});