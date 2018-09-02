$(function () {
    $("#submitCreate").on("click", function () {

        event.preventDefault();
        let postInfo = {
            title: $("#post_title").val().trim(),
            body: $("#post_body").val().trim(),
            // email:
            // url: 
            community: $("#commSelection").val()

        }

        console.log(postInfo)

        $.ajax("/api/add_product/", {
            type: "POST",
            data: postInfo

        }).then(function (data) {
                if (data === "no user found") {
                    alert("You are not registered, please register before posting a listing!")
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

        }).then(function(data){
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

        }).then(function(data){
            location.replace("/index")

            });
    })

    $(".community").on("click", function(event) {
        let communityId =  $(this).attr("id")
        
        console.log(communityId)
        $.ajax("/community/" + communityId, {
            type: "GET"

        }).then(function(data){
            console.log(data)
            location.replace("/community/" + communityId)
            });
    })
})