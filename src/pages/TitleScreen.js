import OpenButton from "../components/OpenButton";
import "./TitleScreen.css";

const TitleScreen = () => {
  return (
    <div className="title-screen">
      <img className="depth-6-frame-0" alt="" src="/depth-6-frame-0@2x.png" />
      <OpenButton />
      <button className="credit-button">
        <div className="credit-button-child" />
        <b className="credit">Credit</b>
      </button>
      <div className="cogeneration-system-simulator-parent">
        <b className="cogeneration-system-simulator-container">
          <p className="cogeneration-system-simulator">{`Cogeneration System Simulator `}</p>
          <p className="cogeneration-system-simulator">on PeLUIT 40 Reactor</p>
        </b>
        <b className="cogeneration-system-simulator-container1">
          <p className="cogeneration-system-simulator">{`Cogeneration System Simulator `}</p>
          <p className="cogeneration-system-simulator">on PeLUIT 40 Reactor</p>
        </b>
      </div>
    </div>
  );
};

export default TitleScreen;
