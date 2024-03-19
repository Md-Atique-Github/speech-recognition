import React, { useState } from "react";
import useSpeechRecognization from "../hooks/useSpeechRecognizationHook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import "./Main.css";

const Main = () => {
  const {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport,
  } = useSpeechRecognization();

  const [isMicOn, setIsMicOn] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

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
          <div className="main-content">
            {isListening && !text && (
              <div>Your Browser is Listening currently ....</div>
            )}
            {text}
          </div>
          <div className="button-container">
            <button className="button" onClick={toggleMic}>
              <FontAwesomeIcon
                icon={isMicOn ? faMicrophone : faMicrophoneSlash}
              />
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
