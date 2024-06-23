import React, { useState, useEffect } from 'react';
import "../pages/Main.css";

const StartButton = ({ startIncreasingValues }) => {
  return (
    <button className="start-button" onClick={startIncreasingValues}>
      <div className="start-button-child" />
      <b className="start">Start</b>
    </button>
  );
};

export default StartButton;