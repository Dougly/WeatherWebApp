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
      var hourlyData = data.hourly.data
      var searchedLoaction = document.getElementById('address').value;
      var icon = data.currently.icon;
      var temp = Math.round(data.currently.temperature);
      var summary = data.currently.summary;
      var windSpeed = Math.round(data.currently.windSpeed);

      $.each(hourlyData, function(index, value) {
        if (index < 11) {
          $("#hr" + index).html(convertTimestamp(value.time));
          $("#hourlyIcon" + index).attr("src", "icons/" + value.icon + ".png");
          $("#hourlyTemp" + index).html(Math.round(value.temperature) + " °F");
        }
      });

      $('#currentHeader').html("Current Weather For " + searchedLoaction);
      $('#mainIcon').attr("src", "icons/" + icon + ".png");
      $('#current-weather #temp').html(temp + " °F");
      $('#current-weather #summary').html(summary)
      $('#current-weather #wind').html(windSpeed + "mph winds")
    });

    $.getJSON(historicalURL, function(data) {

      console.log(data);
    });

  });

}

function convertTimestamp(timestamp) {
  var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
    hh = d.getHours(),
    h = hh,
    ampm = 'AM',
    time;
      
  if (hh > 12) {
    h = hh - 12;
    ampm = 'PM';
  } else if (hh === 12) {
    h = 12;
    ampm = 'PM';
  } else if (hh == 0) {
    h = 12;
  }
  
  // ie: 2013-02-18, 8:35 AM  
  time = h + ampm;
    
  return time;
}


