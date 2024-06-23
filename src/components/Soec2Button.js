import { useCallback } from "react";
import PropTypes from "prop-types";
import "../pages/Main.css";

const Soec2Button = ({ isActive, onClick }) => {
  const onSoec2ButtonClick = useCallback(() => {
    window.open("http://localhost:3000/frame-2");
  }, [onClick]);

  return (
    <img
      className={`frame-icon2 ${isActive ? "active" : ""}`}
      alt=""
      src={isActive ? "/frame1@2x.png" : "/frame1@2x1.png"}
      onClick={onSoec2ButtonClick}
    />
  );
};

Soec2Button.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default Soec2Button;