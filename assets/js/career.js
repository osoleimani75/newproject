function attacheHtml(fileName) {
  $('#includeHtml').empty();
  $('#includeHtml').load('pages/' + fileName + ".html");

}

// get parameters from user's input for LFW
$(document).on("click", "#lfw-button", function (event) {
  // prevents page refresh
  event.preventDefault();
  $("#results-div").empty();
  var titleSearch = $("#keywordLookup").val().trim();
  var locationSearch = $("#cityLookup").val().trim();
  // console.log(titleSearch);
  // console.log(locationSearch);
  var loading = $("<h3>").text("Loading...");
  loading.attr("id", "loading-text")
  $("#results-div").append(loading);

  joobleSearch(titleSearch, locationSearch);
})

function joobleSearch(title, location) {
  var url = "https://us.jooble.org/api/";
  var key = "34a9751b-7ddd-45f6-92d5-801f278b9a82";
  // var paramsTemplate = "{ keywords: 'Web Developer', location: 'San Diego, CA'}"
  var params = "{keywords: '" + title + "', location: '" + location + "'}";

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
      for (var i = 0; i < jsonResponse.jobs.length; i++) {
        // console.log(jsonResponse.jobs[i].company);
        // console.log(jsonResponse.jobs[i].title);
        // console.log(jsonResponse.jobs[i].snippet);
        // console.log(jsonResponse.jobs[i].type);

        // card div
        var card = $("<div>");
        card.addClass("card mt-4 mb-4");
        // card header div
        var headerHolder = $("<div>")
        headerHolder.addClass("card-header")
        var cardHeader = $("<h3>").html("<strong>" + jsonResponse.jobs[i].title + "</strong>");
        headerHolder.append(cardHeader);
        // card body div
        var cardBody = $("<div>");
        cardBody.addClass("card-body");
        var company = $("<h4>").html("<strong>Company: </strong>" + jsonResponse.jobs[i].company);
        var description = $("<p>").html(jsonResponse.jobs[i].snippet);
        var jobType = $("<p>").html("<strong>Job Type:</strong> " + jsonResponse.jobs[i].type)
        var link = $("<p>").html("<strong>Link:</strong> <a href=" + jsonResponse.jobs[i].link + " target='_blank'>Take me to the full listing</a>")
        cardBody.append(company);
        cardBody.append(description);
        cardBody.append(jobType);
        cardBody.append(link);
        card.append(headerHolder);
        card.append(cardBody);
        $("#results-div").append(card);
        $("#loading-text").remove();

      };
    };
  };
  //Send request to the server
  http.send(params);
}

