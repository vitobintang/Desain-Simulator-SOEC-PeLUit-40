import React, { useState, useEffect } from 'react';
import "../pages/Main.css";

const StopButton = ({ stopIncreasingValues }) => {
  return (
    <button className="stop-button" onClick={stopIncreasingValues}>
      <div className="stop-button-child" />
      <b className="start">Stop</b>
    </button>
  );
};

export default StopButton;