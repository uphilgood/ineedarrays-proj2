let express = require("express");
let community = require("../model/postsDB.js");
var createHash = require('create-hash');
var passwordHash = require('password-hash');
const bcrypt = require('bcrypt');
let router = express.Router();
const saltRound = 10
let hashSalt

router.get("/", function (req, res) {
  community.community.getAll(function (data) {
    res.render("login", {
      data: data
    });
  });
});

router.get("/index", function (req, res) {
  community.community.getAll(function (data) {
    res.render("index", {
      data: data
    });

  });
});

router.get("/input", function (req, res) {
  community.community.getAll(function (data) {
    res.render("input", {
      data: data
    });

  });
});

router.post("/api/add_product/", function (req, res) {
  // console.log(req.body.title)
  // console.log(req.body.body)
  let postingTitle = req.body.title
  let postingBody = req.body.body
  let communityID = req.body.community
  community.postings.addNewPost(postingTitle, postingBody, communityID, function (data) {
    res.json(data)
  })
})


//login user
router.post("/loginuser", function (req, res) {
  community.users.login(req.body.username, function (data) {
    let newPassword = data.password
    console.log(newPassword)
    bcrypt.compare(req.body.password, newPassword).then(function (resp) {
      // res == true
      console.log(resp)
      if (resp) {
        res.json(resp)
      }
    });
  })
});


//sign up user
router.post("/createuser", function (req, res) {
  //create hash
  bcrypt.hash(req.body.password, saltRound, function (err, hash) {
    community.users.addUser(req.body.username, hash, function (data) {
      res.json(data)
    })
  });
})

// Export routes for server.js to use.
module.exports = router;