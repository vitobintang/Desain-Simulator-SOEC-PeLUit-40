import React, { createContext, useState, useEffect, useContext, useRef} from 'react';
import PropTypes from "prop-types";
import { useLocation } from 'react-router-dom';
import "./Soec1.css";

const Soec1 = () => {
  const [values, setValues] = useState({
    kghr200c1: { massFlow: 0, temperature: 0, pressure: 0 },
    kghr701c3: { massFlow: 0, temperature: 0, pressure: 0 },
    kghr500c2: { massFlow: 0, temperature: 0, pressure: 0 },
    kghr1000c5: { massFlow: 0, temperature: 0, pressure: 0 },
    kghr1000c6: { massFlow: 0, temperature: 0, pressure: 0 },
    kghr1000c7: { massFlow: 0, temperature: 0, pressure: 0 },
    kghr1000c8: { massFlow: 0, temperature: 0, pressure: 0 },
    kghr998c1: { massFlow: 0, temperature: 0, pressure: 0 },
    kghr20c4: { massFlow: 0, temperature: 0, pressure: 0 },
    kghr20c5: { massFlow: 0, temperature: 0, pressure: 0 },
    kghr20c6: { massFlow: 0, temperature: 0, pressure: 0 },
    kghr500c3: { massFlow: 0, temperature: 0, pressure: 0 },
    kghr258c1: { massFlow: 0, temperature: 0, pressure: 0 },
    kghr701c4: { massFlow: 0, temperature: 0, pressure: 0 },
    kghr701c5: { massFlow: 0, temperature: 0, pressure: 0 },
    kghr25c3: { massFlow: 0, temperature: 0, pressure: 0 },
    kghr25c4: { massFlow: 0, temperature: 0, pressure: 0 },
    kghr252c1: { massFlow: 0, temperature: 0, pressure: 0 },
    kghr25c5: { massFlow: 0, temperature: 0, pressure: 0 },
    kghr1000c9: { massFlow: 0, temperature: 0, pressure: 0 },
    kghr20c7: { massFlow: 0, temperature: 0, pressure: 0 },
  });
  
  const maxValues = {
    kghr200c1: { massFlow: 452, temperature: 200, pressure: 5 },
    kghr701c3: { massFlow: 118, temperature: 701, pressure: 5 },
    kghr500c2: { massFlow: 452, temperature: 500, pressure: 5 },
    kghr1000c5: { massFlow: 452, temperature: 1000, pressure: 5 },
    kghr1000c6: { massFlow: 7, temperature: 1000, pressure: 5 },
    kghr1000c7: { massFlow: 2, temperature: 1000, pressure: 5 },
    kghr1000c8: { massFlow: 344, temperature: 1000, pressure: 5 },
    kghr998c1: { massFlow: 344, temperature: 998, pressure: 5 },
    kghr20c4: { massFlow: 344, temperature: 20, pressure: 1 },
    kghr20c5: { massFlow: 341, temperature: 20, pressure: 1 },
    kghr20c6: { massFlow: 3, temperature: 20, pressure: 1 },
    kghr500c3: { massFlow: 2, temperature: 500, pressure: 5 },
    kghr258c1: { massFlow: 2, temperature: 258, pressure: 5 },
    kghr701c4: { massFlow: 7, temperature: 701, pressure: 5 },
    kghr701c5: { massFlow: 111, temperature: 701, pressure: 5 },
    kghr25c3: { massFlow: 111, temperature: 25, pressure: 4 },
    kghr25c4: { massFlow: 43, temperature: 25, pressure: 4 },
    kghr252c1: { massFlow: 43, temperature: -252, pressure: 5 },
    kghr25c5: { massFlow: 68, temperature: 25, pressure: 4 },
    kghr1000c9: { massFlow: 118, temperature: 1000, pressure: 5 },
    kghr20c7: { massFlow: 2, temperature: 20, pressure: 1 },
  };

  const intervalIdsRef = useRef({});
  const location = useLocation([]);
  
  const startIncreasingValues = () => {
    const duration = 10000;
    const interval = 100;
    const steps = duration / interval;

    Object.keys(values).forEach(containerKey => {
      const { massFlow: maxMassFlow, temperature: maxTemperature, pressure: maxPressure } = maxValues[containerKey];
      const massFlowStep = maxMassFlow / steps;
      const temperatureStep = maxTemperature / steps;
      const pressureStep = maxPressure / steps;

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
        }));

        if (currentStep >= steps) {
          clearInterval(intervalId);
        }
      }, interval);
      intervalIdsRef.current[containerKey] = intervalId;
    });
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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const buttonClicked = params.get('buttonClicked');

    if (buttonClicked === 'true') {
      console.log('Button clicked!');
      startIncreasingValues();
    }
  }, [location.search]);

  return (
    <div className="soec1-parent">
      <img className="soec1-icon" alt="" src="/soec2@2x.png" />
      <div className="soec1">
        <div className="kghr-200-c-container1">
          <p className="kghr24">{values.kghr200c1.massFlow.toFixed(0)} kg/hr</p>
          <p className="kghr24">{values.kghr200c1.temperature.toFixed(0)} °C</p>
          <p className="kghr24">{values.kghr200c1.pressure.toFixed(0)} bar</p>
        </div>
        <div className="kghr-701-c-container3">
          <p className="kghr24">118 kg/hr</p>
          <p className="kghr24">701 °C</p>
          <p className="kghr24">5 bar</p>
        </div>
        <div className="kghr-500-c-container2">
          <p className="kghr24">452 kg/hr</p>
          <p className="kghr24">500 °C</p>
          <p className="kghr24">5 bar</p>
        </div>
        <div className="kghr-1000-c-container5">
          <p className="kghr24">452 kg/hr</p>
          <p className="kghr24">1000 °C</p>
          <p className="kghr24">5 bar</p>
        </div>
        <div className="kghr-1000-c-container6">
          <p className="kghr24">7 kg/hr</p>
          <p className="kghr24">1000 °C</p>
          <p className="kghr24">5 bar</p>
        </div>
        <div className="kghr-1000-c-container7">
          <p className="kghr24">2 kg/hr</p>
          <p className="kghr24">1000 °C</p>
          <p className="kghr24">5 bar</p>
        </div>
        <div className="kghr-1000-c-container8">
          <p className="kghr24">344 kg/hr</p>
          <p className="kghr24">1000 °C</p>
          <p className="kghr24">5 bar</p>
        </div>
        <div className="kghr-998-c-container1">
          <p className="kghr24">344 kg/hr</p>
          <p className="kghr24">998 °C</p>
          <p className="kghr24">5 bar</p>
        </div>
        <div className="kghr-20-c-container4">
          <p className="kghr24">344 kg/hr</p>
          <p className="kghr24">20 °C</p>
          <p className="kghr24">1 bar</p>
        </div>
        <div className="kghr-20-c-container5">
          <p className="kghr24">341 kg/hr</p>
          <p className="kghr24">20 °C</p>
          <p className="kghr24">1 bar</p>
        </div>
        <div className="kghr-20-c-container6">
          <p className="kghr24">3 kg/hr</p>
          <p className="kghr24">20 °C</p>
          <p className="kghr24">1 bar</p>
        </div>
        <div className="kghr-500-c-container3">
          <p className="kghr24">2 kg/hr</p>
          <p className="kghr24">500 °C</p>
          <p className="kghr24">5 bar</p>
        </div>
        <div className="kghr-258-c-container1">
          <p className="kghr24">2 kg/hr</p>
          <p className="kghr24">258 °C</p>
          <p className="kghr24">5 bar</p>
        </div>
        <div className="kghr-701-c-container4">
          <p className="kghr24">7 kg/hr</p>
          <p className="kghr24">701 °C</p>
          <p className="kghr24">5 bar</p>
        </div>
        <div className="kghr-701-c-container5">
          <p className="kghr24">111 kg/hr</p>
          <p className="kghr24">701 °C</p>
          <p className="kghr24">5 bar</p>
        </div>
        <div className="kghr-25-c-container3">
          <p className="kghr24">111 kg/hr</p>
          <p className="kghr24">25 °C</p>
          <p className="kghr24">4 bar</p>
        </div>
        <div className="kghr-25-c-container4">
          <p className="kghr24">43 kg/hr</p>
          <p className="kghr24">25 °C</p>
          <p className="kghr24">4 bar</p>
        </div>
        <div className="kghr-252-c-container1">
          <p className="kghr24">43 kg/hr</p>
          <p className="kghr24">-252 °C</p>
          <p className="kghr24">5 bar</p>
        </div>
        <div className="kghr-25-c-container5">
          <p className="kghr24">68 kg/hr</p>
          <p className="kghr24">25 °C</p>
          <p className="kghr24">4 bar</p>
        </div>
        <div className="kghr-1000-c-container9">
          <p className="kghr24">118 kg/hr</p>
          <p className="kghr24">1000 °C</p>
          <p className="kghr24">5 bar</p>
        </div>
        <div className="kghr-20-c-container7">
          <p className="kghr24">2 kg/hr</p>
          <p className="kghr24">20 °C</p>
          <p className="kghr24">1 bar</p>
        </div>
      </div>
      <div className="hydrogen-generated-soec-1">
        <div className="hydrogen-generated-soec-1-child" />
        <b className="hydrogen-generated-soec1">Hydrogen Generated SOEC 1</b>
        <b className="kghr45">43 kg/hr</b>
      </div>
      <div className="water-produced2">
        <div className="hydrogen-generated-soec-1-child" />
        <b className="water-produced3">Water Produced</b>
        <b className="kghr45">68 kg/hr</b>
      </div>
      <div className="enriched-air-generated2">
        <div className="hydrogen-generated-soec-1-child" />
        <b className="hydrogen-generated-soec1">Enriched Air Generated</b>
        <b className="kghr45">3 kg/hr</b>
      </div>
      <div className="power-needed-for-soec-module1">
        <div className="hydrogen-generated-soec-1-child" />
        <b className="hydrogen-generated-soec1">
          Power Needed for SOEC Module 1
        </b>
        <b className="kghr45">2.1 MW</b>
      </div>
    </div>
  );
};

// Soec1.propTypes = {
//   isActive: PropTypes.bool.isRequired,
//   onButtonClick: PropTypes.func.isRequired,
// };

export default Soec1;
