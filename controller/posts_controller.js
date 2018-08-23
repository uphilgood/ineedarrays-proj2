let express = require("express");


let router = express.Router();
// Import the model (cat.js) to use its database functions.
let community = require("../model/posts.js");

router.get("/", function(req, res) {
    community.getAll(function(data) {
    
      console.log(data);
      res.render("index", {data: data});
    });
  });
  

  
  // Export routes for server.js to use.
  module.exports = router;
  