// Get Current Location of User

function getCurrentLocation(callback){
    var currentLocation ={};
    $.ajax({
        url: "https://geoip-db.com/jsonp",
        jsonpCallback: "callback",
        dataType: "jsonp",  
    }).then(function(location){
        currentLocation.country = (location.country_name);
        currentLocation.state = (location.state);
        currentLocation.city = (location.city);
        currentLocation.postal = (location.postal);
        currentLocation.latitude = (location.latitude);
        currentLocation.longitude = (location.longitude);
        currentLocation.IPv4 = (location.IPv4);
        callback(currentLocation);
    }).catch(function(err){
        console.log(err);
    });
}
