// import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";

function PredictButton() {
    const predict = () => {
      console.log("Predicte button clicked");
      // model inference
      const visorInstance = tfvis.visor();
      visorInstance.surface({
        name: "Audio Analysis",
        tab: "Feature Extraction",
      });
      // insert data
      visorInstance.toggle();
    };

    return (
        <button className="Button" type="button" onClick={predict}>
          Predict
        </button>
    );
  }
  
  export default PredictButton;
  