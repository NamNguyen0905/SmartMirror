//		global variables
var dailyNews = new Array(10);
for (i = 0; i < dailyNews.length; i++) {
  dailyNews[i] = new Array(2);
}
var apiNEWS =
  "https://newsapi.org/v2/top-headlines?" +
  "sources=bbc-news&" +
  "apiKey=595b8d2cebb4408d97340a35a34aa53e";
fetch(apiNEWS)
  .then(response => {
    return response.json();
  })
  .then(data => {
    // Work with JSON data here
    for (i = 0; i < dailyNews.length; i++) {
      dailyNews[i][0] = data.articles[i].title;
      dailyNews[i][1] = data.articles[i].description;
      // Get image URL from API
      document.getElementById("img" + (i + 1)).src =
        data.articles[i].urlToImage;
    }
    console.log(dailyNews);
  })
  .catch(err => {
    console.log("Error! Couldn't fetch the news data.");
  });

//Ten random jokes
var jokes = new Array(10);
$.getJSON("https://official-joke-api.appspot.com/random_ten", function(data) {
  for (var i = 0; i < 10; i++) {
    jokes[i] = data[i].setup + "! " + data[i].punchline;
  }
  console.log(jokes);
});

//This is using tone.js
//create a synth and connect it to the master output (your speakers)
var synth = new Tone.Synth().toMaster();

const SpeechRecognition =
  window.speechRecognition || window.webkitSpeechRecognition;

//Creating recognition object
const recognition = new SpeechRecognition();
var listening;
var userText = "";
const speech = new SpeechSynthesisUtterance();
speech.voice = window.speechSynthesis.getVoices()[7];

function listen() {
  console.log("Listen was run");
  setTimeout(function() {
    console.log("Recognition has begun");
    recognition.start();
  }, 1000);
}

recognition.onresult = function(event) {
  console.log(event);
  const current = event.resultIndex;
  const transcript = event.results[current][0].transcript;
  console.log(transcript);
  userText += transcript;
  recognition.stop();
  readOutLoud(userText);
  userText = "";
  //recognizer.listen(result);
};

function readOutLoud(message) {
  var botText = "";
  //Greetings
  if (
    message.search("how are you") >= 0 ||
    message.search("how you doing") >= 0 ||
    message.search("hello how are you") >= 0 ||
    message.search("are you doing today") >= 0
  ) {
    botText = greetings[Math.floor(Math.random() * greetings.length)];
  } else if (
    message.search("hello") >= 0 ||
    message.search("hey") >= 0 ||
    message.search("what's up") >= 0 ||
    message.search("what is up") >= 0
  ) {
    botText = "Hello";
  }
  //Responses about creator, jokes, thank you
  else if (
    message.search("your creator") >= 0 ||
    message.search("your father") >= 0 ||
    message.search("made you") >= 0 ||
    message.search("who created you") >= 0
  ) {
    botText += creator[Math.floor(Math.random() * creator.length)];
  } else if (message.search("thank you") >= 0) {
    botText += thank[Math.floor(Math.random() * thank.length)];
  } else if (
    message.search("give me a joke") >= 0 ||
    message.search("tell me a joke") >= 0 ||
    message.search("humor me") >= 0
  ) {
    botText += jokes[Math.floor(Math.random() * jokes.length)];
  }
  //response about news
  else if (
    message.search("what's happening around the world") >= 0 ||
    message.search("tell me the news") >= 0 ||
    message.search("give me the news") >= 0 ||
    message.search("give me my daily update") >= 0
  ) {
    botText = "These are the top news highlights from around the world! ";
    for (i = 0; i < dailyNews.length; i++) {
      botText += i + 1 + "! " + dailyNews[i][0] + "! ";
    }
    botText +=
      "Do you wish to learn more about a particular news article? If so, which one?";
  }
  //Responses about date, day or time
  else if (
    message.search("what day is it") >= 0 ||
    message.search("what day of the week is it") >= 0 ||
    message.search("what is todays day") >= 0
  ) {
    botText = "Today is " + curDayOfWeek;
  } else if (
    message.search("what month is it") >= 0 ||
    message.search("what month are we in") >= 0
  ) {
    botText = "It is currently " + curMonth;
  } else if (
    message.search("what year is it") >= 0 ||
    message.search("what year are we in") >= 0
  ) {
    botText = "It is currently the year " + curYear;
  } else if (
    message.search("what's the time") >= 0 ||
    message.search("what time is it") >= 0 ||
    message.search("give me the time") >= 0 ||
    message.search("tell me the time") >= 0 ||
    message.search("what is the time") >= 0
  ) {
    botText = "The time is " + curTime;
  } else if (
    message.search("what's the date today") >= 0 ||
    message.search("what's the date") >= 0 ||
    message.search("give me the date") >= 0 ||
    message.search("tell me the date") >= 0
  ) {
    botText = "Today's date is " + curDate;
  } else if (message.search("Keep a timer for") >= 0) {
    //ADD VARIABLES TO LEARN THE TIME as we had spoken about
    // speech.text = "Hey! The countdown is over!";
  }
  //responses about weather
  else if (
    message.search("what is the temperature today") >= 0 ||
    message.search("what is the temperature outside") >= 0 ||
    message.search("what is today's outside temperature") >= 0 ||
    message.search("how hot is it") >= 0 ||
    message.search("is it hot") >= 0 ||
    message.search("how sunny") >= 0 ||
    message.search("is it sunny") >= 0 ||
    message.includes("sunscreen")
  ) {
    botText = "The outside temperature is " + temp + "°F.";
    if (temp >= 90) {
      botText += " Yup. Global warming is real!";
    }
    if (currentSummary.includes("Cloudy")) {
      botText += " It does not seem to be sunny today!";
    }
    if (uvindex > 5) {
      botText +=
        " Also the UV index is " + uvindex + ". Better put on your sunscreen";
    } else if (uvindex < 5 && message.includes("sunscreen")) {
      botText += " The UV index is " + uvindex + ". You don't need sunscreen.";
    }
  } else if (message.includes("weather")) {
    botText += "It looks like it's going to be " + currentSummary;
  } else if (message.includes("humid")) {
    botText += "Humidity is about " + humid * 100 + "%";
  } else if (message.includes("rain") || message.includes("umbrella")) {
    botText += "Humidity is about " + humid * 100 + "%.";
    if (dailySummary.includes("rain")) {
      botText +=
        " The forcast predicts " +
        dailySummary +
        ". I'd carry an umbrella if I were you.";
    } else {
      botText += " The forcast predicts " + dailySummary;
    }
    // insertBotText(botText);
    // speech.text = botText;
  } else if (
    message.includes("to snow") ||
    message.includes("snowing") ||
    message.includes("jacket") ||
    message.includes("it cold")
  ) {
    botText += "Wind speed is about " + windspeed + " mph.";
    if (dailySummary.includes("snow") || temp <= 57) {
      botText +=
        " The forcast predicts " +
        dailySummary +
        ". I'd carry a jacket. It is freezing outside.";
    } else {
      botText +=
        " The outside temperature is " +
        temp +
        "°F. It won't snow, but it is chilly. So please grab a light jacket.";
    }
  }
  //Add countdown feature
  // /set\s.+\stimer\s.+\s(\d+)\s(seconds|second|Seconds|Second|minutes|minute|Minutes|Minute|hours|hour|Hours|Hour)/i
  else if (message.search("set timer") >= 0) {
    let myRegexp = /(\d+)+\s([minutes?|seconds?|hours?]+)/gi;
    let match = myRegexp.exec(message);
    let deadline = new Date(Date.parse(new Date()) + 5 * 1000); //Default 5 seconds
    if (match) {
      switch (match[2]) {
        case "seconds":
        case "second":
        case "Seconds":
        case "Second":
          deadline = new Date(
            Date.parse(new Date()) + parseInt(match[1]) * 1000
          );
          break;
        case "minutes":
        case "minute":
        case "Minutes":
        case "Minute":
          deadline = new Date(
            Date.parse(new Date()) + parseInt(match[1]) * 60 * 1000
          );
          break;
        case "hours":
        case "hour":
        case "Hours":
        case "Hour":
          deadline = new Date(
            Date.parse(new Date()) + parseInt(match[1]) * 60 * 60 * 1000
          );
      }
    } else {
      console.log("No match");
    }

    botText = "OK, I have set the timer for " + match[1] + " " + match[2];
    initializeClock("countdown", deadline);
  }
  // Search for "alarm" & "at" keyword to trigger
  else if (message.includes("alarm") && message.includes("at")) {
    let myRegexp = /(\d{1,2})(:(\d{2}))?\s+(a.m.|p.m.)/g;
    let match = myRegexp.exec(message);

    let time_remaining, deadline;
    let cur = new Date();

    // Transfer the set time to minutes (i.e. at 10 AM => at 10*60 AM)
    time_remaining =
      (parseInt(match[1]) + (match[4] == "p.m." ? 12 : 0)) * 60 +
      (match[3] != undefined ? parseInt(match[3]) : 0);

    // Calculate time left until the set time
    time_remaining =
      time_remaining * 60 * 1000 -
      cur.getHours() * 60 * 60 * 1000 -
      cur.getMinutes() * 60 * 1000 -
      cur.getSeconds() * 1000;

    // In case the time_remaining is negative (set over 12 hours)
    if (time_remaining < 0) {
      time_remaining += 24 * 60 * 60 * 1000;
    }

    deadline = new Date(Date.parse(new Date()) + time_remaining);
    botText =
      "OK, I have set the alarm at " +
      match[1] +
      (match[3] != undefined ? ":" + match[3] : "") +
      " " +
      match[4];
    initializeClock("countdown", deadline);
  } else if (message.search("Hey! The countdown is over") >= 0) {
    //Stopping recognition incase microphone is listening
    recognition.stop();
    recognizer.stopListening();
    botText = "Hey! The countdown is over.";
  } else {
    botText = "Sorry I don't have a response.";
  }
  speech.text = botText;
  speech.volume = 1;
  speech.rate = 0.8;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
  insertBotText(botText);
  botText = "";

  speech.onend = function() {
    //this can be added at the end of the listen() function
    recognizer.listen(result);
  };
}

recognition.onerror = function() {
  console.error("Error. No speech");
  recognizer.listen(result);
};

const greetings = [
  "I'm good. Thank you for asking",
  "Hey! Just a little confused. My owner did not program me to answer so many questions.",
  "I'm upset. Siri, Alexa and Google Assistant are bullying me"
];

const creator = [
  "ACM is my creator. I am a work in progress.",
  "Nobody owns me or created me. I am a strong independent bot."
];

const thank = [
  "You're welcome.",
  "Bow down when you are talking to me, puny human.",
  "You owe me big time.",
  "Alright now take me back to area 51."
];

function insertBotText(botText) {
  displayText = document.getElementById("botText");
  displayText.textContent = botText;
}
