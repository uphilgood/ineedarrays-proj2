var Sequelize = require('sequelize');
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/connection.js')[env];


if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

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
    post_email: Sequelize.STRING,
    post_image_url: Sequelize.STRING,
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
        sequelize.query("select p.post_title, p.post_body, c.community_name, c.community_id from posts p right join community c on c.community_id = p.community_id where c.community_name = 'Cars' limit 3", {
            type: sequelize.QueryTypes.SELECT
        }).then(cars =>
            sequelize.query("select p.post_title, p.post_body, c.community_name, c.community_id from posts p right join community c on c.community_id = p.community_id where c.community_name = 'Electronics' limit 3", {
                type: sequelize.QueryTypes.SELECT
            }).then(electronics => {
                sequelize.query("select p.post_title, p.post_body, c.community_name, c.community_id from posts p right join community c on c.community_id = p.community_id where c.community_name = 'Housing' limit 3", {
                    type: sequelize.QueryTypes.SELECT
                }).then(housing => {
                    sequelize.query("select p.post_title, p.post_body, c.community_name, c.community_id from posts p right join community c on c.community_id = p.community_id where c.community_name = 'Jobs' limit 3", {
                        type: sequelize.QueryTypes.SELECT
                    }).then(jobs => {
                        callback(cars, electronics, housing, jobs)
                    })
                })
            })
        )
    }, 
    getAllArticlesInCommunity: (communityId, callback) => {
       postDb.findAll({
           where: {community_id: communityId}
       }).then(articles => 
        callback(articles)
    )}
}

let postings = {
    addNewPost: (title, body, email, url, community, callback) => {
        postDb.upsert({
            post_title: title,
            post_body: body,
            post_email: email, 
            post_image_url: url,
            community_id: community
        }).then(data =>
            callback(data)
        )
    },
    deletePost: (id, callback) => {
        postDb.destroy({
            where: {
                id: id
            }
        }).then(data => {
            callback(data);
        })
        
    }, 
    findUserPosts: (username, callback) => {
        sequelize.query("select p.id, u.username, p.post_title, p.post_body, c.community_name from posts p right join community c on c.community_id = p.community_id right join user u on u.username = p.post_email where u.username = :username",{ replacements: { username: username }, 
            type: sequelize.QueryTypes.SELECT
        }).then(posts => {
            callback(posts)
        })
    },
    findPostUser: (id, callback) => { 
        postDb.findOne({
        where: {
            id: id
        }
    }).then((user) => {
        callback(user)
    })
}
}

let users = {
    findUser: (username, callback) => { 
        userDb.findOne({
        where: {
            username: username
        }
    }).then((user) => {
        callback(user)
    })
},
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

    login: (username, callback, errFunct) => {
        userDb.findOne({
            where: {
                username: username
            }
        }).then(function (data) {
            
            callback(data)
            
        })
    }
}




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