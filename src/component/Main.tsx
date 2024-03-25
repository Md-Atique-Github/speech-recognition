import React, { useState } from "react";
import useSpeechRecognization from "../hooks/useSpeechRecognizationHook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faMicrophoneSlash,
  faVolumeUp,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import "./Main.css";

const Main = () => {
  const {
    text,
    setText,
    isListening,
    startListening,
    stopListening,
    speakText,
    hasRecognitionSupport,
  } = useSpeechRecognization();

  const [isMuted, setIsMuted] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [editableText, setEditableText] = useState("");

  const toggleMic = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening(selectedLanguage);
    }
    setIsMicOn((prevState) => !prevState);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLanguage(e.target.value);
  };

  const handleMuteToggle = () => {
    setIsMuted((prevState) => !prevState);
    if (isMuted) {
      // Unmute
      speakText(text);
    } else {
      // Mute
      window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="container">
      <div>
        <input
          type="radio"
          id="english"
          name="language"
          value="en"
          checked={selectedLanguage === "en"}
          onChange={handleLanguageChange}
        />
        <label htmlFor="english">English</label>
        <input
          type="radio"
          id="urdu"
          name="language"
          value="ur-PK"
          checked={selectedLanguage === "ur-PK"}
          onChange={handleLanguageChange}
          className="radio2"
        />
        <label htmlFor="urdu">Urdu</label>
        <input
          type="radio"
          id="french"
          name="language"
          value="fr-FR"
          checked={selectedLanguage === "fr-FR"}
          onChange={handleLanguageChange}
          className="radio2"
        />
        <label htmlFor="french">French</label>
        <label>
          <input
            type="radio"
            value="ar-SA"
            checked={selectedLanguage === "ar-SA"}
            onChange={handleLanguageChange}
            className="radio2"
          />
          Arabic
        </label>
      </div>
      {hasRecognitionSupport ? (
        <>
          {/* <div className="main-content">
            {isListening && !text && (
              <div>Your Browser is Listening currently ....</div>
            )}
            {text}
          </div> */}

          <textarea
            className="main-content"
            value={text}
            onChange={(e) => {
              if (!isMuted) {
                speakText(e.target.value);
              }
            }}
            placeholder={
              isListening && !text
                ? "Your Browser is Listening currently ...."
                : ""
            }
            readOnly={isListening}
          />

          <div className="button-container">
            <button className="button" onClick={toggleMic}>
              <FontAwesomeIcon
                icon={isMicOn ? faMicrophone : faMicrophoneSlash}
              />
            </button>
            <button className="button" onClick={handleMuteToggle}>
              <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
            </button>
          </div>
        </>
      ) : (
        <h1 className="heading">
          Your Browser does not support Speech Recognition.
        </h1>
      )}
    </div>
  );
};

export default Main;
