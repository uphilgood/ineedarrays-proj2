
let express = require("express");
let bodyParser = require("body-parser");
let exphbs = require("express-handlebars");
let app = express();
let post_controller = require("./controller/posts_controller")
let postDb = require("./model/postsDB.js");
let communityDb = require("./model/postsDB.js");
let community = require("./model/postsDB.js");
let PORT = process.env.PORT || 8080;



app.use(express.static("public"))

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(post_controller)




app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});





