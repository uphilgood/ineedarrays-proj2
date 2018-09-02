let express = require("express");
let community = require("../model/postsDB.js");
var createHash = require('create-hash');
var passwordHash = require('password-hash');
const bcrypt = require('bcrypt');
let router = express.Router();
const saltRound = 10

//login page
router.get("/", function (req, res) {
  community.community.getAll(function (data) {
    res.render("login", {
      data: data
    });
  });
});

//main page
router.get("/index", function (req, res) {
  community.community.getAll(function (cars, electronics, housing, jobs) {
    res.render("index", {
      data: {cars, electronics, housing, jobs}
    });
  });
});

//new post page
router.get("/input", function (req, res) {
  community.community.getAll(function (data) {
    res.render("input", {
      data: data
    });

  });
});

// add a post
router.post("/api/add_product/", function (req, res) {
  let postingTitle = req.body.title
  let postingBody = req.body.body
  let communityID = req.body.community
  community.postings.addNewPost(postingTitle, postingBody, communityID, function (data) {
    res.json(data)
  })
})

//login user
router.post("/loginuser",  (req, res) => {
  community.users.login(req.body.username, data => {
    let newPassword = data.password
    bcrypt.compare(req.body.password, newPassword).then(resp => {
      if (resp) {
        res.json(resp)
      } 
    });
  })
});

//sign up user
router.post("/createuser", (req, res) => {
  //create hash
  bcrypt.hash(req.body.password, saltRound, (err, hash) => {
    community.users.addUser(req.body.username, hash, data => {
      res.json(data)
    })
  });
})

//cars community
router.get("/community/:id", function (req, res) {
  community.community.getAllArticlesInCommunity(req.params.id, function (data) {
    console.log(req.params.id)
    res.render("cars", {
      data: data
    });
  });
});

// Export routes for server.js to use.
module.exports = router;