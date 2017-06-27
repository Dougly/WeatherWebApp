
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
      getCurrentWeatherData(results[0].geometry.location);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function getCurrentWeatherData(location) {
  var lat = location.lat();
  var lng = location.lng();
  var time = Math.round((Date.now() / 1000) - (365 * 24 * 60 * 60))
  console.log(time)
  var key = "442cb8009c262b65928a26aa8f86c66b"
  var currentURL = "https://api.darksky.net/forecast/" + key + "/" + lat + "," + lng + "?callback=?";
  var historicalURL = "https://api.darksky.net/forecast/" + key + "/" + lat + "," + lng + "," + time + "?callback=?";
  $(function() {

    $.getJSON(currentURL, function(data) {
      console.log(data);
    });

    $.getJSON(historicalURL, function(data) {
      console.log(data);
    });

  });

}