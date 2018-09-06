let express = require("express");
let community = require("../model/postsDB.js");
var createHash = require('create-hash');
var passwordHash = require('password-hash');
const bcrypt = require('bcrypt');
let router = express.Router();
const saltRound = 10
let nodemailer = require("nodemailer")
require("dotenv").config();
function AuthEmail (user,pass) {
  this.user = user;
  this.pass = pass
}
let auth = new AuthEmail (process.env.transporter_email,process.env.transporter_pass) 
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth
})




//send email
router.post("/api/sendmail", (req, res) => {

  transporter.sendMail(req.body, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  res.json("email sent")
})


router.get("/email/:userId", (req, res) => {
  console.log(req.params.userId)
  community.postings.findPostUser(req.params.userId, user => {
    console.log(user)
    res.render("email", {
      data: user
    });
  });
});

//login page
router.get("/", (req, res) => {
  community.community.getAll(data => {
    res.render("login", {
      data: data
    });
  });
});

//main page
router.get("/index", (req, res) => {
  community.community.getAll((cars, electronics, housing, jobs) => {
    res.render("index", {
      data: {
        cars,
        electronics,
        housing,
        jobs
      }
    });
  });
});

//new post page
router.get("/input", (req, res) => {
  community.community.getAll(data => {
    res.render("input", {
      data: data
    });
  });
});

// add a post
router.post("/api/add_product/", (req, res) => {
  let postingTitle = req.body.title
  let postingBody = req.body.body
  let postingUser = req.body.email
  let postingUrl = req.body.url
  let communityID = req.body.community
  community.users.findUser(postingUser, user => {
    if (user) {
      console.log(user)
      community.postings.addNewPost(postingTitle, postingBody, postingUser, postingUrl, communityID, data => {
        res.json(data)
      })
    } else {
      res.json("no user found")
    }
  })
})

//login user
router.post("/loginuser", (req, res) => {
  community.users.login(req.body.username, data => {
    if (!data) {
      res.json("no user")
    } else {
      let newPassword = data.password
      bcrypt.compare(req.body.password, newPassword).then(resp => {
        if (!resp) {
          res.json("no user")
        }
        res.json(resp)
      })
    }
  })
})

//user posts
router.get("/userposts/:username" , (req, res) => {
  community.postings.findUserPosts(req.params.username, user => {
    res.render("userposts", {
      data: user
    });
  })
})

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
  community.community.getAllArticlesInCommunity(req.params.id, data => {
    console.log(req.params.id)
    res.render("cars", {
      data: data
    });
  });
});

// delete a post

router.delete("/deletepost/:id", function (req, res) {
  community.postings.deletePost(req.params.id, function (data) {
    res.json(data)

  })
});





// Export routes for server.js to use.
module.exports = router;