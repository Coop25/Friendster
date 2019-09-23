const express = require("express");
const app = express();

const htmlRoutes = require("./app/routing/htmlRoutes");
const apiRoutes = require("./app/routing/apiRoutes.js");

app.use(express.static(`${__dirname}/app/public`));
app.use(express.json());
const PORT = process.env.PORT || 3000;

apiRoutes(app);
htmlRoutes(app);

app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});