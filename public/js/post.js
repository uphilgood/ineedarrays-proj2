$(function () {

    let currentUserEmail

    $("#submitCreate").on("click", function () {
        event.preventDefault();
        let postInfo = {
            title: $("#post_title").val().trim(),
            body: $("#post_body").val().trim(),
            email: $("#post_email").val().trim(),
            url: $("#post_url").val().trim(),
            community: $("#commSelection").val()
        }
        console.log(postInfo)
        $.ajax("/api/add_product/", {
            type: "POST",
            data: postInfo

        }).then(function (data) {
            if (data === "no user found") {
                alert("You are not registered, please register before posting a listing!")
                location.replace("/")
            } else {
                location.replace("/index")
            }
        });
    })

    $("#createUser").on("click", function () {
        event.preventDefault();
        let postInfo = {
            username: $("#newUsername").val().trim(),
            password: $("#thePassword").val()
        }
        console.log(postInfo)
        $.ajax("/createuser", {
            type: "POST",
            data: postInfo
        }).then(function (data) {
            if (data === "fail") {
                alert('user exists')
            } else {
                location.replace("/index")
            }
        });
    })

    $("#loginexistinguser").on("click", function () {
        event.preventDefault();
        let postInfo = {
            username: $("#useremail").val().trim(),
            password: $("#userpassword").val()
        }
        console.log(postInfo)
        $.ajax("/loginuser", {
            type: "POST",
            data: postInfo
        }).then(function (data) {
            console.log(data)
            if (data === "no user") {
                $(".danger").html("The username and/or password you entered does not exist. Please try again.")
            } else {
                location.replace("/index")
            }
        })
    })

    //logging user into their posts page
    $("#loginexistingusertoposts").on("click", function () {
        event.preventDefault();
        let postInfo = {
            username: $("#useremail").val().trim(),
            password: $("#userpassword").val()
        }
        console.log(postInfo)
        $.ajax("/loginuser", {
            type: "POST",
            data: postInfo
        }).then(function (data) {
            console.log(data)
            if (data === "no user") {
                $(".danger").html("The username and/or password you entered does not exist. Please try again.")
            } else {
                $.ajax("/userposts/" + postInfo.username, {
                    type: "GET"
                }).then(data => {
                    location.replace("/userposts/" + postInfo.username)
                })
            }

        })
    })


    $(".sendEmail").on("click", (event) => {
        let userId = $(event.target).attr("value")
        console.log(userId)
        $.ajax("/email/" + userId , {
            type: "GET"
        }).then((data) => {
            location.replace("/email/" + userId)
        })
    })


    $(".community").on("click", function (event) {
        let communityId = $(this).attr("id")
        $.ajax("/community/" + communityId, {
            type: "GET"
        }).then(function (data) {
            console.log(data)
            location.replace("/community/" + communityId)
        })
    });


    $(".delButton").on("click", function (event) {
        let postID = $(this).attr("value")
        let user = $(this).attr("cid")
        $.ajax("/deletepost/" + postID, {
            type: "DELETE"
        }).then(function (data) {
            location.replace("/userposts/" + user)
        })
    })

    // // this will be the function that sends the email
    $("#send_email").on("click", function (event) {
        event.preventDefault();
        let emailInfo = {
            from: 'info.gregslist@gmail.com',
            to: $(event.target).attr("value"),
            subject: $("#email_subject").val().trim(),
            text: $("#email_body").val().trim(),
        }

        console.log(emailInfo)

        // need to capture  to email which will be poster's email, subject, and text of the body in the email
        $.ajax("/api/sendmail", {
            type: "POST",
            data: emailInfo
        }).then(function (data) {
            console.log(data)
            if (data === "email sent") {
                location.replace("/index")
            } else {
                alert("there was an error")
            }
        });
    })
})