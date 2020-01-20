// global letiables
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
  clock.textContent = curDate + " ---- " + curTime;

  clock.innerText = curDate + " ---- " + curTime;

  setTimeout("getTime()", 1000);
}

function getTimeRemaining(endtime) {
  let t = Date.parse(endtime) - Date.parse(new Date());
  let seconds = Math.floor((t / 1000) % 60);
  let minutes = Math.floor((t / 1000 / 60) % 60);
  let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  let days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}

function initializeClock(id, endtime) {
  let clock = document.getElementById(id);
  let daysSpan = clock.querySelector(".days");
  let hoursSpan = clock.querySelector(".hours");
  let minutesSpan = clock.querySelector(".minutes");
  let secondsSpan = clock.querySelector(".seconds");

  function updateClock() {
    let t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    if (t.hours < 10) {
      hoursSpan.innerHTML = ("" + t.hours).slice(-2);
    } else {
      hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
    }
    if (t.minutes < 10) {
      minutesSpan.innerHTML = ("" + t.minutes).slice(-2);
    } else {
      minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
    }
    if (t.seconds < 10) {
      secondsSpan.innerHTML = ("" + t.seconds).slice(-2);
    } else {
      secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
    }

    if (t.total <= 0) {
      clock.textContent = "The countdown is over!";
      clearInterval(timeinterval);
    }
  }

  updateClock();
  let timeinterval = setInterval(updateClock, 1000);
}

// 5 mins from now
let deadline = new Date(Date.parse(new Date()) + 5 * 60 * 1000);

// At 23 PM
//let deadline = new Date("Jan 19 2020 23:00:00");
initializeClock("countdown", deadline);
