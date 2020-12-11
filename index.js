const express = require("express");
let app = express();

const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
//* parse application/json
app.use(bodyParser.json());
app.use("/api", require("./api"));

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
