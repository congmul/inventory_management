// Requiring our models and passport as we've configured it
let db = require("../models");

module.exports = function (app) {
    // ============================== --> FOR CYMBAL PACKS ==============================
    // --> HTML ROUTE
    app.get("/uploadPackCSV", (req, res) => {
        if (req.user) {
            res.render("uploadPackCSV");
        } else {
            res.sendFile(path.join(__dirname, "../public/login.html"));
        }
    });
    // HTML ROUTE <--

    // API ROUTE -->
    // Route for add a Package
    app.post("/api/cymbalPack", (req, res) => {
        console.log(req.body);
        db.Packages.create(req.body).then((data) => {
            res.status(200);
            res.redirect("back");
        }).catch((err) => {
            res.status(500).json(err);
        });
    });

    // Route for add CymbalPacks with CSV File
    app.post("/api/cymbalPacks", (req, res) => {
        console.log(req.body.contents);
        db.Packages.bulkCreate(req.body.contents).then((data) => {
            res.status(200);
            res.redirect("back");
        }).catch((err) => {
            res.status(500).json(err);
        });
    });
    // API ROUTE <--
}