function getTime() {
  let date = new Date();
  //Date
  let year = date.getFullYear();
  if (year < 1000) year += 1900;

  let day = date.getDay();
  let month = date.getMonth();

  let weekArray = new Array(
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  );
  let monthArray = new Array(
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  );

  //Time
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  if (minute < 10) minute = "0" + minute;
  if (second < 10) second = "0" + second;

  let clock = document.getElementById("clockDisplay");
  clock.textContent =
    weekArray[day] +
    " " +
    monthArray[month] +
    " " +
    day +
    " " +
    year +
    " ---- " +
    hour +
    ":" +
    minute +
    ":" +
    second;

  clock.innerText =
    weekArray[day] +
    " " +
    monthArray[month] +
    " " +
    day +
    " " +
    year +
    " ---- " +
    hour +
    ":" +
    minute +
    ":" +
    second;

  setTimeout("getTime()", 1000);
}
