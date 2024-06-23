import PropTypes from "prop-types";
import "./Component2.css";

const Component2 = ({ className = "" }) => {
  return (
    <div className={`component-2 ${className}`}>
      <div className="component-2-child" />
      <b className="electric-power-generated1">
        Electric Power Generated (Netto)
      </b>
    </div>
  );
};

Component2.propTypes = {
  className: PropTypes.string,
};

export default Component2;
