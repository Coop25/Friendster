const express = require("express");
const app = express();

const htmlRoutes = require("./app/routing/htmlRoutes");

app.use(express.static(`${__dirname}/app/public`));
const PORT = process.env.PORT || 3000;

htmlRoutes(app);

app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
  });