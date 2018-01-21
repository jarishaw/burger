var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");

var router = express.Router();

router.get('/', function(req, res) {
    res.redirect("/burgers");
});

// retrieve all burgers
router.get("/burgers", function(req, res) {
    burger.selectAll(function (data) {
        var hbsObject = { burgers: data};
        console.log(hbsObject);
        res.render("index", hbsObject);
        
    });
});

// create a new burger
router.post("/burgers/create", function(req, res) {

    burger.insertOne([
        "burger_name" 
    ], [
        req.body.burger_name
    ], function() {
        res.redirect("/burgers");
    });

});

// update a new burger
router.put("/burgers/update/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.updateOne({
        devoured: req.body.devoured
        
    }, condition, function(result) {
            if (result.changedRows == 0) {
                // If no rows were changed, then the ID must not exist, so 404
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        });
});

module.exports = router;





