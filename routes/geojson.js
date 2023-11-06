var express = require('express');
var geojsoncontrollerThydro = require("../controller/geojson")
var router = express.Router();

/* GET home page. */
console.log("routes ran")
router.get('/', geojsoncontrollerThydro);


module.exports = router;
