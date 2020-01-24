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
    console.log(data);
    for (i = 0; i < dailyNews.length; i++) {
      dailyNews[i][0] = data.articles[i].title;
      dailyNews[i][1] = data.articles[i].description;
    }
    console.log(dailyNews);
  })
  .catch(err => {
    console.log("Error! Couldn't fetch the news data.");
  });

//Ten random jokes
var jokes = new Array(10);
$.getJSON("https://official-joke-api.appspot.com/random_ten", function(data) {
  console.log(data);
  for (var i = 0; i < 10; i++) {
    jokes[i] = data[i].setup + " " + data[i].punchline;
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
// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/cAxP924p/";

async function createModel() {
  const checkpointURL = URL + "model.json"; // model topology
  const metadataURL = URL + "metadata.json"; // model metadata
  window.recognizer = speechCommands.create(
    "BROWSER_FFT", // fourier transform type, not useful to change
    undefined, // speech commands vocabulary feature, not useful for your models
    checkpointURL,
    metadataURL
  );
  // check that model and metadata are loaded via HTTPS requests.
  await recognizer.ensureModelLoaded();
  return recognizer;
}

async function init() {
  const recognizer = await createModel();
  const classLabels = recognizer.wordLabels(); // get class labels. Hotword or background noise
  console.log(classLabels);
  // listen() takes two arguments:
  // 1. A callback function that is invoked anytime a word is recognized.
  // 2. A configuration object with adjustable fields //this is optional
  recognizer.listen(result, {
    includeSpectrogram: false, // in case listen should return result.spectrogram
    probabilityThreshold: 0.95,
    invokeCallbackOnNoiseAndUnknown: false, //this is the one that keeps listening if kept to false
    overlapFactor: 0.5 // probably want between 0.5 and 0.75. More info in README
  });
}

function result() {
  console.log("Listening for hot word");
  listening = 1;
  console.log("Hotword Detected");
  recognizer.stopListening();
  console.log("Stopped listening");
  setTimeout(function() {
    console.log("Playing Tone");
    //play a middle 'C' for the duration of an 8th note
    synth.triggerAttackRelease("C4", "8n");
    Tone.start();
  }, 500);
  listen();
}

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
    //				insertBotText(botText);
    speech.text = botText;
  } else if (
    message.search("hello") >= 0 ||
    message.search("hey") >= 0 ||
    message.search("what's up") >= 0 ||
    message.search("what is up") >= 0
  ) {
    speech.text = "Hello";
  }
  //dumb responses
  else if (
    message.search("your creator") >= 0 ||
    message.search("your father") >= 0 ||
    message.search("made you") >= 0 ||
    message.search("who created you") >= 0
  ) {
    botText += creator[Math.floor(Math.random() * creator.length)];
    //insertBotText(botText); future idea for adding bot
    //text on the screen.
    speech.text = botText;
  } else if (message.search("thank you") >= 0) {
    botText += thank[Math.floor(Math.random() * thank.length)];
    //insertBotText(botText);
    speech.text = botText;
  } else if (
    message.search("give me a joke") >= 0 ||
    message.search("tell me a joke") >= 0 ||
    message.search("humor me") >= 0
  ) {
    botText += jokes[Math.floor(Math.random() * jokes.length)];
    //insertBotText(botText);
    speech.text = botText;
  } else if (
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
    //insertBotText(botText);
    speech.text = botText;
  } else if (
    message.search("what day is it") >= 0 ||
    message.search("what day of the week is it") >= 0 ||
    message.search("what is todays day") >= 0
  ) {
    speech.text = "Today is " + curDayOfWeek;
  } else if (
    message.search("what month is it") >= 0 ||
    message.search("what month are we in") >= 0
  ) {
    speech.text = "It is currently " + curMonth;
  } else if (
    message.search("what year is it") >= 0 ||
    message.search("what year are we in") >= 0
  ) {
    speech.text = "It is currently the year " + curYear;
  } else if (
    message.search("what's the time") >= 0 ||
    message.search("what time is it") >= 0 ||
    message.search("give me the time") >= 0 ||
    message.search("tell me the time") >= 0
  ) {
    speech.text = "The time is " + curTime;
  } else if (
    message.search("what's the date today") >= 0 ||
    message.search("what's the date") >= 0 ||
    message.search("give me the date") >= 0 ||
    message.search("tell me the date") >= 0 ||
    message.search("what is today") >= 0
  ) {
    speech.text = "Today's date is " + curDate;
  } else if (message.search("Hey! The countdown is over!") >= 0) {
    speech.text = "Hey! The countdown is over!";
  } else {
    speech.text = "Sorry I don't have a response.";
  }
  //speech.text = message;
  speech.volume = 1;
  speech.rate = 0.8;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
  botText = "";

  speech.onend = function() {
    //this can be added at the end of the listen() function
    recognizer.listen(result);
  };
}

recognition.onerror = function(event) {
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
