// Requiring our models and passport as we've configured it
let db = require("../models");

module.exports = function (app) {

    // ==================== View Cymbal Route ============================
    // --> HTML Route


    // HTML Route <--

    // --> API Route
    app.get("/api/cymbals/:category01onView/:category02onView/:sizeonView", (req, res) => {
        console.log(req.params);
        let conditionForCategory01 = req.params.category01onView;
        let conditionForCategory02 = req.params.category02onView;
        let conditionForSize = req.params.sizeonView;
        if (req.user) {
            db.Inventory.findAll({
                include: db.Packages
              } 
              ).then((data) => {
                let allItems = [];
                for(let i = 0; i < data.length; i++){
                  allItems.push({
                    "group_id": data[i].dataValues.Package.dataValues.id,
                    "group_code": data[i].dataValues.Package.dataValues.group_code,
                    "category01": data[i].dataValues.category01,
                    "category02": data[i].dataValues.category02,
                    "size": data[i].dataValues.size,
                    "description": data[i].dataValues.description,
                    "code": data[i].dataValues.code,
                    "qty": data[i].dataValues.qty,
                    "ebay_price": data[i].dataValues.ebay_price,
                    "website_price": data[i].dataValues.website_price
                  });
                }
                res.json(allItems);
                // res.render("viewCymbals", {allItems: allItems});
              });
    }else{
        res.sendFile(path.join(__dirname, "../public/login.html"));
    }
        
    });
    // API Route <--

}