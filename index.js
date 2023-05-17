const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();

  const startSpeechRecognition = () => {
    recognition.start();
    console.log("Speech recognition started.");

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("Transcript", transcript)
    };
  };

  const stopSpeechRecognition = () => {
    recognition.stop();
    console.log("Speech recognition stopped.")
  };

  const button = document.getElementById("record-button");
  button.addEventListener("mousedown", startSpeechRecognition);
  button.addEventListener("mouseup", stopSpeechRecognition);
} else {
  console.log("Speech recognition is not supported in this browser");
}