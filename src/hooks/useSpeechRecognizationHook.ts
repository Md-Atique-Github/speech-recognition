import React, { useEffect, useState } from "react";

let recognition: any = null;
if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.lang = "ur-PK";
}

const useSpeechRecognization = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (!recognition) return;

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      setText("");
      for (let i = 0; i < event.results.length; i++) {
        const interimTranscript = event.results[i][0].transcript;
        setText((prevText) => prevText + interimTranscript + " ");
      }
    };

    recognition.onend = () => {
      if (isListening) {
        recognition.start();
      }
    };

    return () => {
      if (recognition && recognition.stop) {
        recognition.stop();
      }
    };
  }, [recognition, isListening]);

  const startListening = (language: string) => {
    setText("");
    setIsListening(true);
    recognition.lang = language;
    recognition.start();
  };
  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  };
  return {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport: !!recognition,
  };
};

export default useSpeechRecognization;
