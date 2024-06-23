import PropTypes from "prop-types";
import "./Component1.css";

const Component1 = ({ className = "" }) => {
  return (
    <div className={`component-4 ${className}`}>
      <div className="component-4-child" />
      <b className="hydrogen-generated1">Hydrogen Generated</b>
    </div>
  );
};

Component1.propTypes = {
  className: PropTypes.string,
};

export default Component1;
