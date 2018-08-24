$(function() {
$("#submitCreate").on("click", function() {

    event.preventDefault();
    let postInfo = {
    title: $("#post_title").val().trim(),
    body: $("#post_body").val().trim(),
    community: $("#commSelection").val()

}


$.ajax("/api/add_product/", {
    type: "POST",
    data: postInfo

}).then(
    function(data){
      //update textbox with value returned from the database
     
       // $("#myauthor").val(data.author);
        //$("#myquote").val(data.quote);

        // location.reload();
       
    });
})
})