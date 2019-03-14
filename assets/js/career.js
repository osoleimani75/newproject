function attacheHtml(fileName) {
  $('#includeHtml').empty();
  $('#includeHtml').load('pages/' + fileName + ".html");

}

// get parameters from user's input for api search
$(document).on("click", "#lfw-button", function (event) {
  // prevents page refresh
  event.preventDefault();
  $("#results-div").empty();
  var titleSearch = $("#keywordLookup").val().trim();
  var locationSearch = $("#cityLookup").val().trim();
  // console.log(titleSearch);
  // console.log(locationSearch);

  // Gives user some visual input that the api making the request
  var loading = $("<h3>").text("Searching...");
  loading.attr("id", "loading-text")
  $("#results-div").append(loading);

  joobleSearch(titleSearch, locationSearch);
})

function joobleSearch(title, location) {
  var url = "https://us.jooble.org/api/";
  // extra keys because jooble limits their api searches to 500 requests per key if the account is not verified
  var key = "d6193eca-4b1a-4b0a-8fba-097445fecf94";
  // var key = "6f329c50-d4a2-4792-9954-dd7ee13155d7";
  // var key = "d05faa90-020a-4885-9a6b-64395f518e6b";
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
      console.log(jsonResponse);
      for (var i = 0; i < jsonResponse.jobs.length; i++) {
        // console.log(jsonResponse.jobs[i].company);
        // console.log(jsonResponse.jobs[i].title);
        // console.log(jsonResponse.jobs[i].snippet);
        // console.log(jsonResponse.jobs[i].type);
        // console.log(jsonResponse.jobs[i].link);

        // Card div
        var card = $("<div>");
        card.addClass("card mt-4 mb-4");
        // Card header div
        var headerHolder = $("<div>")
        headerHolder.addClass("card-header")
        var cardHeader = $("<h5>").html("<strong>" + jsonResponse.jobs[i].title + "</strong>");
        headerHolder.append(cardHeader);
        // Card body div
        var cardBody = $("<div>");
        cardBody.addClass("card-body");
        var company = $("<h5>").html("<strong>Company: </strong>" + jsonResponse.jobs[i].company);
        company.addClass("card-title");
        var description = $("<p>").html(jsonResponse.jobs[i].snippet);
        description.addClass("card-text");
        var location = $("<p>").html("<strong>Location:</strong> " + jsonResponse.jobs[i].location);
        location.addClass("card-text");
        var jobType = $("<p>").html("<strong>Job Type:</strong> " + jsonResponse.jobs[i].type);
        jobType.addClass("card-text");
        var link = $("<p>").html("<strong>Link:</strong> <a id='listing-link' href=" + jsonResponse.jobs[i].link + " target='_blank'>Take me to the full listing</a>");
        link.addClass("card-text");
        // Constructing the card
        cardBody.append(company);
        cardBody.append(description);
        cardBody.append(location);
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
};

