const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();

  const startSpeechRecognition = () => {
    recognition.start();
    console.log("Speech recognition started.");

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("Transcript", transcript)

      sendToServer(transcript)
    };

    recognition.onend = () => {
      console.log("Speech recognition ended.");
    }
  };

  const stopSpeechRecognition = () => {
    recognition.stop();
    console.log("Speech recognition stopped.")
  };

  const sendToServer = (text) => {
    const serverUrl = "My Server Url";
    const model = "gpt-3.5-turbo";
    const payload = {
      text,
      model
    };

    fetch(serverUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(data => {
        const answer = data.answer();
        console.log("Received answer from server:", answer);
        playTextAsSound(answer)
      })
      .catch(error => {
        console.log("Error occurred while sending text to server:", error)
      });
  };

  const playTextAsSound = (text) => {
    const synth = window.speechSynthesis();
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  const button = document.getElementById("record-button");
  button.addEventListener("mousedown", startSpeechRecognition);
  button.addEventListener("mouseup", stopSpeechRecognition);
} else {
  console.log("Speech recognition is not supported in this browser");
}