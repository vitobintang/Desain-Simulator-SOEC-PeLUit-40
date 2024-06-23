import PropTypes from "prop-types";
import "./ComponentRow.css";

const ComponentRow = ({ className = "" }) => {
  return (
    <div className={`component-1 ${className}`}>
      <div className="component-1-child" />
      <b className="cogeneration-system">Cogeneration System</b>
    </div>
  );
};

ComponentRow.propTypes = {
  className: PropTypes.string,
};

export default ComponentRow;
