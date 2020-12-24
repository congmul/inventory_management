// Requiring our models and passport as we've configured it
let db = require("../models");

module.exports = function (app) {

  // --> FOR CYMBALS
  // --> GET ROUTE!!
  // Add New Item Page with Package ID & Name
  app.get("/newcymbals", (req, res) => {
    if (req.user) {
      let packageLists = [];
      db.Packages.findAll().then((data) => {
        for (let i = 0; i < data.length; i++) {
          let tempObj = {}
          tempObj["id"] = data[i].dataValues.id;
          tempObj["discription"] = data[i].dataValues.description;
          packageLists.push(tempObj);
        }
        console.log(packageLists);
        res.render("newcymbals", { packageLists: packageLists });
      });
    } else {
      res.sendFile(path.join(__dirname, "../public/login.html"));
    }
  });

  // GET ROUTE!! <--
  // FOR CYMBALS <--

  // --> FOR Shure Parts
  // --> GET ROUTE!!

  app.get("/newshureparts", (req, res) => {
    if (req.user) {
        res.render("newshureparts");
    } else {
      res.sendFile(path.join(__dirname, "../public/login.html"));
    }
  });

  // GET ROUTE!! <--
  // FOR CYMBALS <--

}