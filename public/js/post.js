$(function() {
$("#submitCreate").on("click", function() {

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
    function(data){
        location.replace("/")
       
    });
})
})