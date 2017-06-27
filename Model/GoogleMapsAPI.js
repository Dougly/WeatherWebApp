var test = "hello";

function initMap() {
  var geocoder = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder);
  });
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      getWeatherData(results[0].geometry.location);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function getWeatherData(location) {
  var lat = location.lat();
  var lng = location.lng();
  var key = "442cb8009c262b65928a26aa8f86c66b"
  var url = "https://api.darksky.net/forecast/" + key + "/" + lat + "," + lng + "?callback=?"

  $(function() {

    $.getJSON(url, function(data) {
      console.log(data);
    });

    // $.ajax({
    //   type: 'GET',
    //   url: url,
    //   success: function(data) {
    //     console.log("HI");
    //     console.log(data);
    //   },
    //   error: function() {
    //     alert("Could not get weather data");
    //   }
    // });

  });
}