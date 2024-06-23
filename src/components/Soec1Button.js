import { useCallback } from "react";
import PropTypes from "prop-types";
import "../pages/Main.css";

const Soec1Button = ({ isActive, onClick }) => {
  const onSoec1ButtonClick = useCallback(() => {
    window.open("http://localhost:3000/frame-1");
  }, [onClick]);

  return (
    <img
      className={`frame-icon1 ${isActive ? "active" : ""}`}
      alt=""
      src={isActive ? "/frame1@2x.png" : "/frame1@2x1.png"}
      onClick={onSoec1ButtonClick}
    />
  );
};

Soec1Button.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default Soec1Button;