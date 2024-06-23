import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./OpenButton.css";

const OpenButton = ({ className = "" }) => {
  const navigate = useNavigate();

  const onOpenButtonClick = useCallback(() => {
    navigate("/main");
  }, [navigate]);

  return (
    <button
      className={`start-button1 ${className}`}
      onClick={onOpenButtonClick}
    >
      <div className="start-button-item" />
      <b className="start1">Start</b>
    </button>
  );
};

OpenButton.propTypes = {
  className: PropTypes.string,
};

export default OpenButton;
