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
    // res.redirect("/")
  })

})

//login user
router.post("/loginuser", function (req, res) {

  community.users.login(req.body.username, function(data) {
    let newPassword = data.password
    console.log(newPassword)
    bcrypt.hash(req.body.password.toString(), hashSalt, function (err, hash) {
      console.log(hash)
      bcrypt.compare(hash, newPassword, function (err, resp) {
        if (resp) {
          console.log("response")
          res.json(resp);
        } else {
          console.log(err)
          res.json(err);
        }
      });
    })
  })
});

//sign up user

router.post("/createuser", function (req, res) {

  //create hash
bcrypt.genSalt(saltRound, function (err, salt) {
  bcrypt.hash(req.body.password.toString(), salt, function (err, hash) {
hashSalt = salt
    community.users.addUser(req.body.username, hash, function (data) {
      res.json(data)
    })
  });

})
  
  // var hashedPassword = passwordHash.generate(req.body.password);

})




// Export routes for server.js to use.
module.exports = router;