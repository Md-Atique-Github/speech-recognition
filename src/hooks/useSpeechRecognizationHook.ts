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

  // const startListening = (language: string) => {
  //   setText("");
  //   setIsListening(true);
  //   recognition.lang = language;
  //   recognition.start();
  // };
  const startListening = (language: string) => {
    setText("");
    setIsListening(true);
    recognition.lang = language === "ur-PK" ? "ur-PK" : language; // Set Urdu code for Urdu selection
    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  };

  // const speakText = (textToSpeak: string) => {
  //   if ("speechSynthesis" in window) {
  //     const utterance = new SpeechSynthesisUtterance(textToSpeak);
  //     window.speechSynthesis.speak(utterance);
  //   } else {
  //     console.error("Speech synthesis not supported.");
  //   }
  // };
  const speakText = (textToSpeak: string, language: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = language; // Set language to Urdu
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Speech synthesis not supported.");
    }
  };

  return {
    text,
    setText,
    isListening,
    startListening,
    stopListening,
    speakText,
    hasRecognitionSupport: !!recognition,
  };
};

export default useSpeechRecognization;
