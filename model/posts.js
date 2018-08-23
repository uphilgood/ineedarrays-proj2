let Sequelize = require("sequelize");
let sequelize = require("../config/connection")

let communityDb = sequelize.define("community", {
    community_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    community_name: Sequelize.STRING,
}, {
    freezeTableName: true,
    timestamps: false
})

let postDb = sequelize.define("posts", {
    post_title: Sequelize.STRING,
    post_body: Sequelize.STRING,
    post_sold: Sequelize.BOOLEAN,
    community_id: Sequelize.INTEGER,
}, {
    freezeTableName: true,
    timestamps: false
})

let community = {
    getAll: (callback) => {
        sequelize.query("select p.post_title, p.post_body, c.community_name from posts p right join community c on c.community_id = p.community_id order by c.community_name", { type: sequelize.QueryTypes.SELECT})
  .then(data => 
    callback(data))
       
    } 
}



// let orm = {
//     allCharacters: function (cb) {
//         db.findAll({}).then(function (results) {
//             cb(results)
//         })
//     },

//     searchCharacter: function (name, cb) {
//         db.findAll({
//             where: {
//                 routeName: name
//             }
//         }).then(function (results) {
//             cb(results)
//         })

//     },

//     addCharacter: function (character, cb) {
//         var routeName = character.name.replace(/\s+/g, "").toLowerCase();
//         console.log(routeName);
//         db.upsert({
//             routeName: routeName,
//             name: character.name,
//             role: character.name,
//             age: character.age,
//             forcePoints: character.forcePoints
//         }).then(function (results) {
//             cb(results)
//         });
//     }
// }



postDb.sync();
communityDb.sync();

module.exports = postDb;
module.exports = communityDb;
module.exports = community;
// module.exports = orm