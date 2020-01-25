var long;
var lat;
var temp, humid, currentSummary, uvindex, windspeed, location, dailySummary;

//weather related stuff loaded in the beginning
window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/a3c5b392bca13d466effc339af07f32e/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          temp = data.currently.temperature;
          humid = data.currently.humidity;
          currentSummary = data.currently.summary;
          uvindex = data.currently.uvIndex;
          windspeed = data.currently.windSpeed;
          dailySummary = data.daily.summary;
          console.log(
            "The temperature is: " +
              temp +
              " The humidity is: " +
              humid +
              " The current summary is: " +
              currentSummary +
              " The UVindex is: " +
              uvindex +
              " The windspeed is: " +
              windspeed +
              " The daily summary is: " +
              dailySummary
          );
        });
    });
  }
};
