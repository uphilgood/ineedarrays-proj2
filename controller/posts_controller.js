let express = require("express");
let community = require("../model/postsDB.js");

let router = express.Router();



router.get("/", function(req, res) {
    community.community.getAll(function(data) {
    


      // console.log(data);
      res.render("index", {data: data});

    });
  });

  router.post("/api/add_product/", function(req, res) {
  // console.log(req.body.title)
  // console.log(req.body.body)
    community.postDb.upsert(
      {
        post_title: req.body.title,
        post_body: req.body.body
      }).then(function(data){
    console.log(data)})
    
  
  })
 


  

   
  // Export routes for server.js to use.
  module.exports = router;
  