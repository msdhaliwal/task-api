const express = require('express');
const bodyParser = require('body-parser');

let app = express();

const PORT = process.env.PORT || 3000;

//* parse application/json
app.use(bodyParser.json());
// note: routing
app.use('/api', require('./api'));

module.exports = app.listen(PORT, () => {
	console.log(`server started at ${PORT}`);
});