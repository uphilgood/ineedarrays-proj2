let express = require("express");
let community = require("../model/postsDB.js");

let router = express.Router();



router.get("/", function(req, res) {
    community.community.getAll(function(data) {
  
      res.render("index", {data: data});

    });
  });

  router.get("/input", function(req, res) {
    community.community.getAll(function(data) {
  
      res.render("input", {data: data});

    });
  });

  router.post("/api/add_product/", function(req, res) {
  // console.log(req.body.title)
  // console.log(req.body.body)
  let postingTitle = req.body.title
  let postingBody = req.body.body
  let communityID = req.body.community
community.postings.addNewPost(postingTitle, postingBody, communityID, function(data) {
  res.json(data)
  // res.redirect("/")
})
  
  })
 


  

   
  // Export routes for server.js to use.
  module.exports = router;
  