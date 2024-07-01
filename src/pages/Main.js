import React, { useState, useRef } from "react";
import Component from "../components/Component";
import Component1 from "../components/Component1";
import Component2 from "../components/Component2";
import ComponentRow from "../components/ComponentRow";
import Soec1Button from "../components/Soec1Button";
import Soec2Button from "../components/Soec2Button";
import StartButton from "../components/StartButton";
import StopButton from "../components/StopButton";
import Soec1 from "../components/Soec1"
import { useNavigate } from 'react-router-dom';
import "./Main.css";

const Main = () => {

  const [values, setValues] = useState({
    kgs245: { massFlow: 0, temperature: 0, pressure: 0 },
    kgs700: { massFlow: 0, temperature: 0, pressure: 0 },
    kgs32: { massFlow: 0, temperature: 0, pressure: 0 },
    kgs175: { massFlow: 0, temperature: 0, pressure: 0 },
    kgs4151: { massFlow: 0, temperature: 0, pressure: 0 },
    kgs32_1: { massFlow: 0, temperature: 0, pressure: 0 },
    kgs32_2: { massFlow: 0, temperature: 0, pressure: 0 },
    kgs145: { massFlow: 0, temperature: 0, pressure: 0 },
    kgs24641: { massFlow: 0, temperature: 0, pressure: 0 },
    kgs9461: { massFlow: 0, temperature: 0, pressure: 0 },
    kgs9461_1: { massFlow: 0, temperature: 0, pressure: 0 },
    kgs26206: { massFlow: 0, temperature: 0, pressure: 0 },
    kgs1457: { massFlow: 0, temperature: 0, pressure: 0 },
    kgs1445: { massFlow: 0, temperature: 0, pressure: 0 },
    kgs520: { massFlow: 0, temperature: 0, pressure: 0 },
    electricPower: 0,
    hydrogen: 0,
    hydrogen1: 0,
    hydrogen2: 0,
    powerSOEC: 0,
  });

  const initialMaxValues  = {
    kgs245: { massFlow: 16.929, temperature: 245, pressure: 30.3 },
    kgs700: { massFlow: 16.929, temperature: 700, pressure: 29.3 },
    kgs32: { massFlow: 0.377, temperature: 32, pressure: 4.7 },
    kgs175: { massFlow: 0.377, temperature: 175, pressure: 4.7 },
    kgs4151: { massFlow: 12.959, temperature: 41.51, pressure: 0.08 },
    kgs32_1: { massFlow: 1263, temperature: 32, pressure: 4.6 },
    kgs32_2: { massFlow: 1263, temperature: 32, pressure: 5 },
    kgs145: { massFlow: 0.423, temperature: 145, pressure: 5 },
    kgs24641: { massFlow: 1.169, temperature: 246.41, pressure: 4.2 },
    kgs9461: { massFlow: 12.959, temperature: 94.61, pressure: 4.2 },
    kgs9461_1: { massFlow: 12.959, temperature: 94.61, pressure: 4.2 },
    kgs26206: { massFlow: 0.423, temperature: 262.06, pressure: 5 },
    kgs1457: { massFlow: 14.551, temperature: 145.7, pressure: 74 },
    kgs1445: { massFlow: 14.551, temperature: 144.5, pressure: 4.1 },
    kgs520: { massFlow: 14.551, temperature: 520, pressure: 60 },
    electricPower: 11.6,
    hydrogen: 86,
    hydrogen1: 43,
    hydrogen2: 43,
    powerSOEC: 4.2,
  };

  const timerRef = useRef(null);
  const intervalIdsRef = useRef({});
  const [runTime, setRunTime] = useState(0);

  const [isActive1, setIsActive1] = useState(false);
  const [isActive2, setIsActive2] = useState(false);

  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

  const [maxValues, setMaxValues] = useState(initialMaxValues);
  const [pageBWindow, setPageBWindow] = useState(null);

  const startIncreasingValues = () => {
    const duration = 10000;
    const interval = 100;
    const steps = duration / interval;

    Object.keys(values).forEach(containerKey => {
      const { massFlow: maxMassFlow, temperature: maxTemperature, pressure: maxPressure } = maxValues[containerKey];
      const massFlowStep = maxMassFlow / steps;
      const temperatureStep = maxTemperature / steps;
      const pressureStep = maxPressure / steps;
      const electricPowerStep = maxValues.electricPower / 2000;
      const hydrogen = 0;
      const powerSOEC = 0;
      const hydrogen1 = 0;
      const hydrogen2 = 0;

      let currentStep = 0;

      const intervalId = setInterval(() => {
        currentStep++;
        setValues(prevValues => ({
          ...prevValues,
          [containerKey]: {
            massFlow: Math.min(prevValues[containerKey].massFlow + massFlowStep, maxMassFlow),
            temperature: Math.min(prevValues[containerKey].temperature + temperatureStep, maxTemperature),
            pressure: Math.min(prevValues[containerKey].pressure + pressureStep, maxPressure),
          },
          electricPower: Math.min(prevValues.electricPower + electricPowerStep, maxValues.electricPower),
          hydrogen: Math.min(prevValues.hydrogen + hydrogen, maxValues.hydrogen),
          powerSOEC: prevValues.powerSOEC,
          hydrogen1: Math.min(prevValues.hydrogen1 + hydrogen1, maxValues.hydrogen1),
          hydrogen2: Math.min(prevValues.hydrogen2 + hydrogen2, maxValues.hydrogen2),
        }));

        if (currentStep >= steps) {
          clearInterval(intervalId);
        }
      }, interval);
      intervalIdsRef.current[containerKey] = intervalId;
    });

    timerRef.current = setInterval(() => {
      setRunTime(prevRunTime => prevRunTime + 1);
    }, 1000);
  };

  const stopIncreasingValues = () => {
    Object.keys(intervalIdsRef.current).forEach((containerKey) => {
      clearInterval(intervalIdsRef.current[containerKey]);
      delete intervalIdsRef.current[containerKey];
    });

    // Stop the timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const changePowerGradually = (targetElectricPower, targetPowerSOEC, targetHydrogen, duration = 2000) => {
    const interval = 100;
    const steps = duration / interval;
    const electricPowerStep = (targetElectricPower - values.electricPower) / steps;
    const powerSOECStep = (targetPowerSOEC - values.powerSOEC) / steps;
    const hydrogenStep = (targetHydrogen - values.hydrogen) / steps;

    let currentStep = 0;

    const intervalId = setInterval(() => {
      currentStep++;
      setValues(prevValues => ({
        ...prevValues,
        electricPower: prevValues.electricPower + electricPowerStep,
        powerSOEC: prevValues.powerSOEC + powerSOECStep,
        hydrogen: prevValues.hydrogen + hydrogenStep,
      }));

      if (currentStep >= steps) {
        clearInterval(intervalId);
      }
    }, interval);
  };

  const changePowerGradually1 = (targetHydrogen1, duration = 2000) => {
    const interval = 100;
    const steps = duration / interval;
    const hydrogenStep1 = (targetHydrogen1 - values.hydrogen1) / steps;

    let currentStep = 0;

    const intervalId = setInterval(() => {
      currentStep++;
      setValues(prevValues => ({
        ...prevValues,
        hydrogen1: prevValues.hydrogen1 + hydrogenStep1,
      }));

      if (currentStep >= steps) {
        clearInterval(intervalId);
      }
    }, interval);
  };

  const changePowerGradually2 = (targetHydrogen2, duration = 2000) => {
    const interval = 100;
    const steps = duration / interval;
    const hydrogenStep2 = (targetHydrogen2 - values.hydrogen2) / steps;

    let currentStep = 0;

    const intervalId = setInterval(() => {
      currentStep++;
      setValues(prevValues => ({
        ...prevValues,
        hydrogen2: prevValues.hydrogen2 + hydrogenStep2,
      }));

      if (currentStep >= steps) {
        clearInterval(intervalId);
      }
    }, interval);
  };

  const decreaseElectricPower1 = () => {
    if (values.electricPower < 2.1) {
      setShowPopup(true);
      return; // Prevent further execution
    }
    setIsActive1(!isActive1);
    console.log("Button clicked");
    if (!pageBWindow || pageBWindow.closed) {
      const newWindow = window.open('/frame-1?buttonClicked=true', '_blank');
      setPageBWindow(newWindow);
    } else {
      pageBWindow.close();
      setPageBWindow(null);
    }
    
    const targetElectricPower = isActive1 ? (values.electricPower + 2.1) : (values.electricPower - 2.1);
    const targetPowerSOEC = isActive1 ? (values.powerSOEC - 2.1) : (values.powerSOEC + 2.1);
    const targetHydrogen = isActive1 ? (values.hydrogen - 43) : (values.hydrogen + 43);
    const targetHydrogen1 = isActive1 ? (values.hydrogen1 - 43) : (values.hydrogen1 + 43);

    changePowerGradually(targetElectricPower, targetPowerSOEC, targetHydrogen);
    changePowerGradually1(targetHydrogen1);
    
    // setValues(prevValues => ({
    //   ...prevValues,
    //   electricPower: isActive1 ? Math.max(prevValues.electricPower + 2.1, 0) : Math.max(prevValues.electricPower - 2.1, 0),
    //   powerSOEC: isActive1 ? Math.max(prevValues.powerSOEC - 2.1, 0) : Math.max(prevValues.powerSOEC + 2.1, 0),
    // }));
    setMaxValues(prevMaxValues => ({
      ...prevMaxValues,
      electricPower: isActive1 ? (initialMaxValues.electricPower) : (prevMaxValues.electricPower - 2.1),
    }));
  };
  const decreaseElectricPower2 = () => {
    if (values.electricPower < 2.1) {
      setShowPopup(true);
      return; // Prevent further execution
    }
    setIsActive2(!isActive2);
    console.log("Button clicked");

    const targetElectricPower = isActive2 ? (values.electricPower + 2.1) : (values.electricPower - 2.1);
    const targetPowerSOEC = isActive2 ? (values.powerSOEC - 2.1) : (values.powerSOEC + 2.1);
    const targetHydrogen = isActive2 ? (values.hydrogen - 43) : (values.hydrogen + 43);
    const targetHydrogen2 = isActive2 ? (values.hydrogen2 - 43) : (values.hydrogen2 + 43);

    changePowerGradually(targetElectricPower, targetPowerSOEC, targetHydrogen);
    changePowerGradually2(targetHydrogen2);

    // setValues(prevValues => ({
    //   ...prevValues,
    //   electricPower: isActive2 ? Math.max(prevValues.electricPower + 2.1, 0) : Math.max(prevValues.electricPower - 2.1, 0),
    //   powerSOEC: isActive2 ? Math.max(prevValues.powerSOEC - 2.1, 0) : Math.max(prevValues.powerSOEC + 2.1, 0),
    // }));
    setMaxValues(prevMaxValues => ({
      ...prevMaxValues,
      electricPower: isActive2 ? (initialMaxValues.electricPower) : (prevMaxValues.electricPower - 2.1),
    }));
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="main">
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Warning</h3>
            <p>Electric power must be at least 2.1 MW to activate.</p>
            <button onClick={closePopup}>OK</button>
          </div>
        </div>
      )}
      <div className="frame">
        <div className="frame1">
          <div className="run-time">
            <Component
              powerNeededForSOECModule="Run Time"
              showPowerNeededFor={false}
              propAlignSelf="unset"
              propHeight="178px"
              propPadding="unset"
              propPosition="absolute"
              propWidth="346px"
              propMargin="unset"
              propTop="0px"
              propRight="unset"
              propBottom="unset"
              propLeft="0px"
              propHeight1="100%"
              propWidth1="100%"
              propPosition1="absolute"
              propMargin1="unset"
              propTop1="0%"
              propRight1="0%"
              propBottom1="0%"
              propLeft1="0%"
              propAlignSelf1="unset"
              propFlex="unset"
              propMargin2="unset"
              propHeight2="25.56%"
              propFlex1="unset"
              propFontWeight="unset"
              propWidth2="72.54%"
            />
            <b className="b">{formatTime(runTime)}</b>
            <b className="run-time1">Run Time</b>
          </div>
          <div className="power-needed-for-soec-module2">
            <Component
              powerNeededForSOECModule="Power Needed for SOEC Module"
              showPowerNeededFor
            />
            <b className="mw2">{values.powerSOEC.toFixed(1)}  MW</b>
          </div>
          <div className="hydrogen-generated">
            <Component1 />
            <b className="mw2">{values.hydrogen.toFixed(0)} kg/hr</b>
          </div>
          <div className="electric-power-generated">
            <Component2 />
            <b className="b">{values.electricPower.toFixed(1)} MW</b>
          </div>
          <div className="tittle-and-startstop-button">
            <ComponentRow />
            <StartButton startIncreasingValues={startIncreasingValues} />
            <StopButton stopIncreasingValues={stopIncreasingValues} />
          </div>
        </div>
      </div>
      <div className="frame2">
        <div className="frame3">
          <img className="frame-icon" alt="" src="/frame@2x.png" />
          <div className="frame4">
            <button className="soecbutton1" onClick={decreaseElectricPower1}>
              <div className="soecbutton1-child" />
              <b className="deactivate">{isActive1 ? "Deactivate" : "Activate"}</b>
            </button>
          </div>
          <div className="frame5">
            <button className="soecbutton2" onClick={decreaseElectricPower2}>
              <div className="soecbutton1-child" />
              <b className="deactivate">{isActive2 ? "Deactivate" : "Activate"}</b>
            </button>
            </div>
          <div className="frame6">
            <div className="main-system">
              <b className="output">OUTPUT</b>
              <p className="output">{values.hydrogen1.toFixed(0)}kg/hr</p>
              <b className="output1">OUTPUT</b>
              <p className="output1">{values.hydrogen2.toFixed(0)}kg/hr</p>

              {/* Container for kgs-245-c */}
              <div className="kgs-245-c-container">
                <p className="kgs">{values.kgs245.massFlow.toFixed(3)} kg/s</p>
                <p className="kgs">{values.kgs245.temperature.toFixed(1)} °C</p>
                <p className="kgs">{values.kgs245.pressure.toFixed(1)} bar</p>
              </div>
              {/* Container for kgs-700-c */}
              <div className="kgs-700-c-container">
                <p className="kgs">{values.kgs700.massFlow.toFixed(3)} kg/s</p>
                <p className="kgs">{values.kgs700.temperature.toFixed(1)} °C</p>
                <p className="kgs">{values.kgs700.pressure.toFixed(1)} bar</p>
              </div>
              {/* Container for kgs-32-c */}
              <div className="kgs-32-c-container">
                <p className="kgs">{values.kgs32.massFlow.toFixed(3)} kg/s</p>
                <p className="kgs">{values.kgs32.temperature.toFixed(1)} °C</p>
                <p className="kgs">{values.kgs32.pressure.toFixed(1)} bar</p>
              </div>
              {/* Container for kgs-175-c */}
              <div className="kgs-175-c-container">
                <p className="kgs">{values.kgs175.massFlow.toFixed(3)} kg/s</p>
                <p className="kgs">{values.kgs175.temperature.toFixed(1)} °C</p>
                <p className="kgs">{values.kgs175.pressure.toFixed(1)} bar</p>
              </div>
              {/* Container for kgs-4151-c */}
              <div className="kgs-4151-c-container">
                <p className="kgs">{values.kgs4151.massFlow.toFixed(3)} kg/s</p>
                <p className="kgs">{values.kgs4151.temperature.toFixed(2)} °C</p>
                <p className="kgs">{values.kgs4151.pressure.toFixed(2)} bar</p>
              </div>
              {/* Container for kgs-32-c1 */}
              <div className="kgs-32-c-container1">
                <p className="kgs">{values.kgs32_1.massFlow.toFixed(0)} kg/s</p>
                <p className="kgs">{values.kgs32_1.temperature.toFixed(1)} °C</p>
                <p className="kgs">{values.kgs32_1.pressure.toFixed(1)} bar</p>
              </div>
              {/* Container for kgs-32-c2 */}
              <div className="kgs-32-c-container2">
                <p className="kgs">{values.kgs32_2.massFlow.toFixed(0)} kg/s</p>
                <p className="kgs">{values.kgs32_2.temperature.toFixed(1)} °C</p>
                <p className="kgs">{values.kgs32_2.pressure.toFixed(1)} bar</p>
              </div>
              {/* Container for kgs-145-c */}
              <div className="kgs-145-c-container">
                <p className="kgs">{values.kgs145.massFlow.toFixed(3)} kg/s</p>
                <p className="kgs">{values.kgs145.temperature.toFixed(1)} °C</p>
                <p className="kgs">{values.kgs145.pressure.toFixed(1)} bar</p>
              </div>
              {/* Container for kgs-24641-c */}
              <div className="kgs-24641-c-container">
                <p className="kgs">{values.kgs24641.massFlow.toFixed(3)} kg/s</p>
                <p className="kgs">{values.kgs24641.temperature.toFixed(2)} °C</p>
                <p className="kgs">{values.kgs24641.pressure.toFixed(1)} bar</p>
              </div>
              {/* Container for kgs-9461-c */}
              <div className="kgs-9461-c-container">
                <p className="kgs">{values.kgs9461.massFlow.toFixed(3)} kg/s</p>
                <p className="kgs">{values.kgs9461.temperature.toFixed(2)} °C</p>
                <p className="kgs">{values.kgs9461.pressure.toFixed(1)} bar</p>
              </div>
              {/* Container for kgs-9461-c1 */}
              <div className="kgs-9461-c-container1">
                <p className="kgs">{values.kgs9461_1.massFlow.toFixed(3)} kg/s</p>
                <p className="kgs">{values.kgs9461_1.temperature.toFixed(2)} °C</p>
                <p className="kgs">{values.kgs9461_1.pressure.toFixed(1)} bar</p>
              </div>
              {/* Container for kgs-26206-c */}
              <div className="kgs-26206-c-container">
                <p className="kgs">{values.kgs26206.massFlow.toFixed(3)} kg/s</p>
                <p className="kgs">{values.kgs26206.temperature.toFixed(2)} °C</p>
                <p className="kgs">{values.kgs26206.pressure.toFixed(1)} bar</p>
              </div>
              {/* Container for kgs-1457-c */}
              <div className="kgs-1457-c-container">
                <p className="kgs">{values.kgs1457.massFlow.toFixed(3)} kg/s</p>
                <p className="kgs">{values.kgs1457.temperature.toFixed(1)} °C</p>
                <p className="kgs">{values.kgs1457.pressure.toFixed(0)} bar</p>
              </div>
              {/* Container for kgs-1445-c */}
              <div className="kgs-1445-c-container">
                <p className="kgs">{values.kgs1445.massFlow.toFixed(3)} kg/s</p>
                <p className="kgs">{values.kgs1445.temperature.toFixed(1)} °C</p>
                <p className="kgs">{values.kgs1445.pressure.toFixed(1)} bar</p>
              </div>
              {/* Container for kgs-520-c */}
              <div className="kgs-520-c-container">
                <p className="kgs">{values.kgs520.massFlow.toFixed(3)} kg/s</p>
                <p className="kgs">{values.kgs520.temperature.toFixed(0)} °C</p>
                <p className="kgs">{values.kgs520.pressure.toFixed(0)} bar</p>
              </div>
            </div>
          </div>
          <Soec1Button isActive={isActive1}/>
          <Soec2Button isActive={isActive2}/>
          {/* <img className="frame-icon1" alt="" src="/frame1@2x.png" /> */}
          {/* <img className="frame-icon2" alt="" src="/soec-act-2@3x.png" /> */}
        </div>
      </div>
    </div>
  );
};

export default Main;