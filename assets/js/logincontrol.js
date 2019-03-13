// firebase connection
var database = firebase.database();

//----------------------------------------------
// When user signs up for an account
//----------------------------------------------
function signupUser (){
    var fName = $("#FName").val().trim();
    var mName = $("#MName").val().trim();
    var lName = $("#LName").val().trim();
    var email = $("#inputEmail1").val().trim();
    var password = $("#inputPassword2").val().trim();
    var pNumber = $("#contactNumber").val().trim();
    var resumeLink = $("#resumeLink").val().trim();
    var skillDescription = $("#skillDescription").val().trim();
    database.ref("/usersinfo").push({
        firstname: fName,
        middlename: mName,
        lastname: lName,
        email: email,
        password: password,
        resume: resumeLink,
        description: skillDescription
    });
}

//----------------------------------------------
// When user login to an account
//----------------------------------------------
function loginUser(){

}


$(document).ready(function(){
    $("#signUp").on("click", function (event) {
        event.preventDefault();
        signupUser();
    });

    $("#loginUser").on("click", function (event) {
        event.preventDefault();
        loginUser();
    });

    
});