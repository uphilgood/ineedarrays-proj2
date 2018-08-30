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

let userDb = sequelize.define("user", {

    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});

let community = {
    getAll: callback => {
        sequelize.query("select p.post_title, p.post_body, c.community_name from posts p right join community c on c.community_id = p.community_id where c.community_name = 'Cars'", {
                type: sequelize.QueryTypes.SELECT
            })
            .then(cars =>
                sequelize.query("select p.post_title, p.post_body, c.community_name from posts p right join community c on c.community_id = p.community_id where c.community_name = 'Electronics'", {
                    type: sequelize.QueryTypes.SELECT
                }).then(electronics => {
                    sequelize.query("select p.post_title, p.post_body, c.community_name from posts p right join community c on c.community_id = p.community_id where c.community_name = 'Housing'", {
                        type: sequelize.QueryTypes.SELECT
                    }).then(housing => {
                        sequelize.query("select p.post_title, p.post_body, c.community_name from posts p right join community c on c.community_id = p.community_id where c.community_name = 'Jobs'", {
                            type: sequelize.QueryTypes.SELECT
                        }).then(jobs => {
                            callback(cars, electronics, housing, jobs)
                        })
                    })
                })  
                
            )}
}

let postings = {
    addNewPost: (title, body, community, callback) => {
        postDb.upsert({
            post_title: title,
            post_body: body,
            post_sold: 0,
            community_id: community
        }).then(data =>
            callback(data)
        )
    }
}

let users = {
    addUser: (username, hash, callback) => {
        userDb.findOne({
            where: {
                username: username
            }
        }).then(function (name) {
            if (name) {
                callback("fail")
            } else {
                userDb.create({
                    username: username,
                    password: hash
                }).then(function (data) {
                    callback(data)
                }).catch(function (err) {
                    console.log(err);
                })
            }
        })
            
        
    },

    login: (username, callback) => {
        userDb.findOne({
            where: {
                username: username
            }
        }).then(function (data) {
            callback(data)
        })
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

module.exports = {
    postDb: postDb,
    communityDb: communityDb,
    community: community,
    postings: postings,
    users: users
};
// module.exports = orm