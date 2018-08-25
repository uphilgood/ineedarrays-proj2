let express = require("express");
let community = require("../model/postsDB.js");
var createHash = require('create-hash');
var passwordHash = require('password-hash');
const bcrypt = require('bcrypt');
let router = express.Router();

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
    // res.redirect("/")
  })

})

//login user
router.post("/loginuser", function (req, res) {

  community.users.login(req.body.password, function(data) {
    let newPassword = data.password
    bcrypt.hash(newPassword.toString(), 10, function (err, hash) {
      bcrypt.compare(newPassword, newPassword, function (err, res) {
        if (res) {
          res.json("Correct Password");
        } else {
          res.json("In Correct Password");
        }
      });
    })
  })
});

//sign up user

router.post("/createuser", function (req, res) {

  //create hash

  bcrypt.hash(req.body.password.toString(), 10, function (err, hash) {
    community.users.addUser(req.body.username, hash, function (data) {
      res.json(data)
    })
  });
  // var hashedPassword = passwordHash.generate(req.body.password);

})




// Export routes for server.js to use.
module.exports = router;