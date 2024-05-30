// import * as tfvis from "@tensorflow/tfjs-vis";
const tfvis = require('@tensorflow/tfjs-vis');

function ShowButton() {
  async function openVis () {
    const visorInstance = tfvis.visor();
    visorInstance.toggle();
  };

  return (
      <button className="Button" type="button" onClick={openVis}>
        Show Charts
      </button>
  );
}

export default ShowButton;
