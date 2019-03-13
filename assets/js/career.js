function attacheHtml(fileName){
    $('#includeHtml').empty();
    $('#includeHtml').load('pages/' + fileName +".html");

}// get parameters from user's input for LFW

$("#lfw-button").on("click", function (event) {
  // prevents page refresh
  event.preventDefault();
  var titleSearch = $("#jobTitleSearchParam").val().trim();
  var locationSearch = $("#locationSearchParam").val().trim();
  var salarySearch = $("#salarySearchParam").val().trim();
  console.log(titleSearch);
  console.log(locationSearch);
  console.log(salarySearch);

  var results = joobleSearch(titleSearch, locationSearch, salarySearch);
  console.log(results);
})

function joobleSearch(title, location, salary) {
  var url = "https://us.jooble.org/api/";
  var key = "63e7fe87-63ba-4b2b-9b1a-35a3e3d71f97";
  // params temp variable used to construct actual params variable with user's input
  // var params = "{ keywords: 'Job title', location: 'Location', salary: 'number'}";
  var params = "{keywords: '" + title + "', location: '" + location + "', salary: '" + salary + "'}";

  //create xmlHttpRequest object
  var http = new XMLHttpRequest();
  //open connection. true - asynchronous, false - synchronous
  http.open("POST", url + key, true);

  //Send the proper header information
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  //Callback when the state changes
  http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
      var jsonResponse = JSON.parse(http.responseText);
      // console.log(jsonResponse);
      // need to display title, location, salary, and jpb link in cards on results page
    }
  }
  //Send request to the server
  http.send(params);
}

