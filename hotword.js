const listener = document.getElementById("loader");
loader.style.display = "none";
// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/_Gd8JsJP/";

// https://teachablemachine.withgoogle.com/models/cAxP924p/

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
	document.documentElement.webkitRequestFullscreen();
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
		overlapFactor: 0 // probably want between 0.5 and 0.75. More info in README
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
		listener.style = "inline";
	}, 500);
	listen();
}
