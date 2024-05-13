// import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";

function ShowButton() {
  async function openVis () {
    const visorInstance = tfvis.visor();
    visorInstance.toggle();
      // if (!visorInstance.isOpen()) {
      //   // if (visorInstance.isFullscreen) {
      //   //   visorInstance.toggleFullScreen();
      //   // }
      //   visorInstance.toggle();
      // }
  };

  return (
      <button className="Button" type="button" onClick={openVis}>
        Show Charts
      </button>
  );
}

export default ShowButton;
