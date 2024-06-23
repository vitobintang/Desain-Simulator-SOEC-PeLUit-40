import { useMemo } from "react";
import PropTypes from "prop-types";
import "./Component.css";

const Component = ({
  className = "",
  powerNeededForSOECModule,
  showPowerNeededFor,
  propAlignSelf,
  propHeight,
  propPadding,
  propPosition,
  propWidth,
  propMargin,
  propTop,
  propRight,
  propBottom,
  propLeft,
  propHeight1,
  propWidth1,
  propPosition1,
  propMargin1,
  propTop1,
  propRight1,
  propBottom1,
  propLeft1,
  propAlignSelf1,
  propFlex,
  propMargin2,
  propHeight2,
  propFlex1,
  propFontWeight,
  propWidth2,
}) => {
  const component3Style = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
      height: propHeight,
      padding: propPadding,
      position: propPosition,
      width: propWidth,
      margin: propMargin,
      top: propTop,
      right: propRight,
      bottom: propBottom,
      left: propLeft,
    };
  }, [
    propAlignSelf,
    propHeight,
    propPadding,
    propPosition,
    propWidth,
    propMargin,
    propTop,
    propRight,
    propBottom,
    propLeft,
  ]);

  const rectangleDivStyle = useMemo(() => {
    return {
      height: propHeight1,
      width: propWidth1,
      position: propPosition1,
      margin: propMargin1,
      top: propTop1,
      right: propRight1,
      bottom: propBottom1,
      left: propLeft1,
      alignSelf: propAlignSelf1,
      flex: propFlex,
    };
  }, [
    propHeight1,
    propWidth1,
    propPosition1,
    propMargin1,
    propTop1,
    propRight1,
    propBottom1,
    propLeft1,
    propAlignSelf1,
    propFlex,
  ]);

  const powerNeededForStyle = useMemo(() => {
    return {
      margin: propMargin2,
      height: propHeight2,
      flex: propFlex1,
      fontWeight: propFontWeight,
      width: propWidth2,
    };
  }, [propMargin2, propHeight2, propFlex1, propFontWeight, propWidth2]);

  return (
    <div className={`component-3 ${className}`} style={component3Style}>
      <div className="component-3-child" style={rectangleDivStyle} />
      {showPowerNeededFor && (
        <b className="power-needed-for2" style={powerNeededForStyle}>
          {powerNeededForSOECModule}
        </b>
      )}
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  powerNeededForSOECModule: PropTypes.string,
  showPowerNeededFor: PropTypes.bool,

  /** Style props */
  propAlignSelf: PropTypes.any,
  propHeight: PropTypes.any,
  propPadding: PropTypes.any,
  propPosition: PropTypes.any,
  propWidth: PropTypes.any,
  propMargin: PropTypes.any,
  propTop: PropTypes.any,
  propRight: PropTypes.any,
  propBottom: PropTypes.any,
  propLeft: PropTypes.any,
  propHeight1: PropTypes.any,
  propWidth1: PropTypes.any,
  propPosition1: PropTypes.any,
  propMargin1: PropTypes.any,
  propTop1: PropTypes.any,
  propRight1: PropTypes.any,
  propBottom1: PropTypes.any,
  propLeft1: PropTypes.any,
  propAlignSelf1: PropTypes.any,
  propFlex: PropTypes.any,
  propMargin2: PropTypes.any,
  propHeight2: PropTypes.any,
  propFlex1: PropTypes.any,
  propFontWeight: PropTypes.any,
  propWidth2: PropTypes.any,
};

export default Component;
