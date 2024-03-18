import React from 'react';
import useSpeechRecognization from '../hooks/useSpeechRecognizationHook';
import "./Main.css";

const Main = () => {
  const {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport,
  } = useSpeechRecognization();

  return (
    <div className="container">
    {hasRecognitionSupport ? (
      <>
        <div className="main-content"> 
          {isListening ? <div>Your Browser is Listening currently.</div> : null}
          {text}
        </div>
        <div className="button-container">
          <button className="button" style={{ marginRight: "" }} onClick={startListening}>Start Listening</button>
          <button className="button" onClick={stopListening}>Stop Listening</button>
        </div>
      </>
    ) : (
      <h1 className="heading">Your Browser does not support Speech Recognition.</h1>
    )}
  </div>
  );
}

export default Main;
