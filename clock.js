// global variables
let curDayOfWeek = "";
let curMonth = "";
let curYear = "";
let curTime = "";
let curDate = "";

function getTime() {
  //Date
  let date = new Date();
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

  curDayOfWeek = weekArray[day];
  curMonth = monthArray[month];
  curYear = year;
  if (hour >= 0 && hour < 12) {
    curTime = hour + ":" + minute + " AM";
  } else {
    curTime = hour - 12 + ":" + minute + " PM";
  }
  curDate = curMonth + " " + day;
  switch (day) {
    case 1:
    case 21:
    case 31:
      curDate += "st ";
      break;
    case 2:
    case 22:
      curDate += "nd ";
      break;
    case 3:
    case 23:
      curDate += "rd ";
      break;
    default:
      curDate += "th ";
  }
  curDate += year;

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
