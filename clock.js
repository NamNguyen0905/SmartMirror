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

  curMonth = monthArray[month];
  curDayOfWeek = weekArray[day];
  curDate = curMonth + " " + day + " " + curYear;

  //Time
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  if (minute < 10) minute = "0" + minute;
  if (second < 10) second = "0" + second;

  curYear = year;
  if (hour > 0 && hour < 12) {
    curTime = hour + ":" + minute + "AM";
  } else if (hour == 0) {
    curTime = "12:" + minute + "AM";
  } else if (hour == 12) {
    curTime = "12:" + minute + "PM";
  } else {
    curTime = hour - 12 + ":" + minute + "PM";
  }

  let clock = document.getElementById("clockDisplay");
  clock.textContent =
    weekArray[day] +
    ", " +
    monthArray[month] +
    " " +
    (day < 10 ? "0" : "") +
    day +
    " " +
    "\n" +
    curTime;

  clock.innerText =
    weekArray[day] +
    ", " +
    monthArray[month] +
    " " +
    (day < 10 ? "0" : "") +
    day +
    " " +
    "\n" +
    curTime;

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

  function updateClock() {
    let t = getTimeRemaining(endtime);

    // Display if days > 0
    if (t.days > 0) {
      if (clock.querySelector(".days") == null) {
        let daysSpan = document.createElement("span");
        daysSpan.classList.add("days");
        clock.appendChild(daysSpan);
      }
      let daysSpan = clock.querySelector(".days");
      daysSpan.innerHTML = t.days + " days ";
    } else if (clock.querySelector(".days") != null) {
      let daysSpan = clock.querySelector(".days");
      daysSpan.innerHTML = "";
    }

    // Display if hours > 0
    if (t.hours > 0) {
      if (clock.querySelector(".hours") == null) {
        let hoursSpan = document.createElement("span");
        hoursSpan.classList.add("hours");
        clock.appendChild(hoursSpan);
      }
      let hoursSpan = clock.querySelector(".hours");
      if (t.hours < 10) {
        hoursSpan.innerHTML = ("" + t.hours).slice(-2);
      } else {
        hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
      }
      hoursSpan.innerHTML += " hours ";
    } else if (clock.querySelector(".hours") != null) {
      let hoursSpan = clock.querySelector(".hours");
      hoursSpan.innerHTML = "";
    }

    // Display if minutes > 0
    if (t.minutes > 0) {
      if (clock.querySelector(".minutes") == null) {
        let minutesSpan = document.createElement("span");
        minutesSpan.classList.add("minutes");
        clock.appendChild(minutesSpan);
      }
      let minutesSpan = clock.querySelector(".minutes");
      if (t.minutes < 10) {
        minutesSpan.innerHTML = ("" + t.minutes).slice(-2);
      } else {
        minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
      }
      minutesSpan.innerHTML += " minutes ";
    } else if (clock.querySelector(".minutes") != null) {
      let minutesSpan = clock.querySelector(".minutes");
      minutesSpan.innerHTML = "";
    }

    if (t.seconds > 0) {
      if (clock.querySelector(".seconds") == null) {
        let secondsSpan = document.createElement("span");
        secondsSpan.classList.add("seconds");
        clock.appendChild(secondsSpan);
      }
      let secondsSpan = clock.querySelector(".seconds");
      if (t.seconds < 10) {
        secondsSpan.innerHTML = ("" + t.seconds).slice(-2);
      } else {
        secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
      }
      secondsSpan.innerHTML += " seconds.";
    } else if (clock.querySelector(".seconds") != null) {
      let secondsSpan = clock.querySelector(".seconds");
      secondsSpan.innerHTML = "";
    }

    if (t.total <= 0) {
      clock.innerHTML = "TIMER";
      readOutLoud("Hey! The countdown is over!");
      clearInterval(timeinterval);
    }
  }

  updateClock();
  let timeinterval = setInterval(updateClock, 1000);
}

// 5 mins from now
// let deadline = new Date(Date.parse(new Date()) + 5 * 1000);

// At 23 PM
//let deadline = new Date("Jan 19 2020 23:00:00");
// initializeClock("countdown", deadline);
