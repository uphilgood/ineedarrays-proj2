let express = require("express");
let community = require("../model/posts.js");

let router = express.Router();



router.get("/", function(req, res) {
    community.getAll(function(data) {
    
      console.log(data);
      res.render("input", {data: data});
    });
  });
  

   
  // Export routes for server.js to use.
  module.exports = router;
  