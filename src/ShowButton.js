// import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";

function ShowButton() {

  const showPrediction = () => {
    console.log("Show Prediction button clicked");
    const visorInstance = tfvis.visor();
    visorInstance.toggle();
    //   if (!visorInstance.isOpen()) {
    //     visorInstance.toggle();
    //   }
  };
  return (
      <button className="Button" type="button" onClick={showPrediction}>
        Show Prediction
      </button>
  );
}

export default ShowButton;
