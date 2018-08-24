
function function1() {
let postInfo = {
    //ADD THE LISTENER .val() stuff here!!
    title: "Honda NSX",
    body: "I need a right hand drive Honda NSX 2017"

}
$.ajax("/api/add_product/", {
    type: "POST",
    data: postInfo

}).then(
    function(data){
      //update textbox with value returned from the database
     
       // $("#myauthor").val(data.author);
        //$("#myquote").val(data.quote);

        location.reload();
    });
}

function1();