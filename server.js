//importing express
const express = require("express");
const app = express();

//requiring routes
const htmlRoutes = require("./app/routing/htmlRoutes");
const apiRoutes = require("./app/routing/apiRoutes.js");

//setting the public folder to be visible to all people
app.use(express.static(`${__dirname}/app/public`));
app.use(express.json());

//set the port
const PORT = process.env.PORT || 3000;

//run the routes
apiRoutes(app);
htmlRoutes(app);

//listen to the port
app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});