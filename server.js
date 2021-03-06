// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
// Requiring passport as we've configured it
const passport = require("./config/passport");
const https = require('https');
const fs = require('fs');
const path = require('path');


// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "top secret", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Set Handlebars.
const exphbs = require("express-handlebars");
// joel - i was getting a handlebars access has been denied error and found this solution (added runtimeOptions). reference: http://www.prowebguru.com/2020/08/nodejs-express-handlebars-access-denied-resolve-property-solution/#.X9bVvNhKiUl
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main",
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        },
    })
);
app.set("view engine", "handlebars");

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
require("./routes/newItem-routes.js")(app);
require("./routes/newPackage-routes.js")(app);
require("./routes/viewAll-routes.js")(app);
require("./routes/ebayAPI.js")(app);

// Syncing our database and logging a message to the user upon success
// db.sequelize.sync().then(function() {
//   app.listen(PORT, function() {
//     console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
//   });
// });
const certOptions = {
  key: fs.readFileSync(path.resolve('./public/config/localdomain.insecure.key')),
  cert: fs.readFileSync(path.resolve('./public/config/localdomain.crt')),
}

db.sequelize.sync().then(function() {
  https.createServer(certOptions, app)
  .listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit https://localhost:%s/ in your browser.", PORT, PORT);
  });
});
