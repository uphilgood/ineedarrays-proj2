$(function () {
    $("#submitCreate").on("click", function () {

        event.preventDefault();
        let postInfo = {
            title: $("#post_title").val().trim(),
            body: $("#post_body").val().trim(),
            community: $("#commSelection").val()

        }

        console.log(postInfo)

        $.ajax("/api/add_product/", {
            type: "POST",
            data: postInfo

        }).then(
            function (data) {
                location.replace("/")

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
            
            location.replace("/index")
            });
    })

    $("#login").on("click", function () {

        event.preventDefault();
        let postInfo = {
            username: $("#newUsername").val().trim(),
            password: $("#thePassword").val()

        }

        console.log(postInfo)

        $.ajax("/loginuser", {
            type: "POST",
            data: postInfo

        }).then(function(data){
            location.replace("/")

            });
    })
})