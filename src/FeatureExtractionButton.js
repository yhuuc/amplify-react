import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';

function FeatureExtractionButton () {
    // async function extract () {
    //     const visorInstance = tfvis.visor();
    //     if (!visorInstance.isOpen()) {
    //         visorInstance.toggle();
    //     }
    //     const tensor = tf.tensor1d([0, 0, 0, 0, 2, 3, 4]);

    //     const surface1 = {name: 'Values Distribution', tab: 'Model Inspection'};
    //     await tfvis.show.valuesDistribution(surface1, tensor);
    //     // disable the button

    //     const model = tf.sequential({
    //         layers: [
    //           tf.layers.dense({inputShape: [784], units: 32, activation: 'relu'}),
    //           tf.layers.dense({units: 10, activation: 'softmax'}),
    //         ]
    //       });
          
    //       const surface2 = { name: 'Layer Summary', tab: 'Model Inspection'};
    //       tfvis.show.layer(surface2, model.getLayer(undefined, 1));
    //   }
    async function Extract() {

    }

    return (
        <button className="Button" type="button" onClick={Extract}>
          Extract Features
        </button>
    )
}

export default FeatureExtractionButton;