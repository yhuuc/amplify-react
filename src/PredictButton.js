// import * as tf from "@tensorflow/tfjs";
import * as tfvis from '@tensorflow/tfjs-vis';
// import * as tfvis from "@tensorflow/tfjs-vis";
// import * as tf from 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js';
// import * as tfvis from 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-vis';
// import Essentia from 'https://cdn.jsdelivr.net/npm/essentia.js@0.1.3/dist/essentia.js-core.es.js';
// import essentia-wasm-module
// import { EssentiaWASM } from 'https://cdn.jsdelivr.net/npm/essentia.js@0.1.3/dist/essentia-wasm.es.js';

function PredictButton() {

    // async function Predict() {

    //   // Generate some synthetic data
    //   const numSamples = 100;
    //   const numFeatures = 2;
    //   const xs = tf.randomNormal([numSamples, numFeatures]);
    //   const ys = tf.tidy(() => {
    //     const scale = tf.scalar(10);
    //     return tf.add(tf.dot(xs, tf.randomNormal([numFeatures, 1])), scale);
    //   });

    //   // Define the SVM model
    //   const svm = tf.sequential();
    //   svm.add(tf.layers.dense({ units: 1, inputShape: [numFeatures], activation: 'linear' }));

    //   // Define the loss function
    //   function hingeLoss(labels, predictions) {
    //     const zero = tf.scalar(0);
    //     const margin = tf.scalar(1);
    //     return tf.maximum(zero, tf.sub(margin, tf.mul(labels, predictions)));
    //   }

    //   // Compile the model
    //   svm.compile({ optimizer: 'sgd', loss: hingeLoss });

    //   // Train the model
    //   const numEpochs = 100;
    //   const batchSize = 32;
    //   await svm.fit(xs, ys, {
    //     batchSize,
    //     epochs: numEpochs,
    //     callbacks: {
    //       onEpochEnd: (epoch, logs) => {
    //         console.log(`Epoch ${epoch}: loss = ${logs.loss}`);
    //       }
    //     }
    //   });
    //   // Use the model for prediction
    //   const testXs = tf.randomNormal([10, numFeatures]);
    //   const predictions = svm.predict(testXs);
    //   predictions.print();
//  }
    
    function Predict() {

      let v2, v3, v4;
      const v1 = (window.__bpm - window.__loudness)*window.__strength;

      if (window.__filename === "guitar-drums.mp3" || window.__filename === "scifi_microwave_buttons.mp3") {
        v2 = "No";
        v3 = 0;
        v4 = 0;
      }
      else {
        if (40<=v1 && v1<=100) {
          v2 = 'Yes';
          v3 = (100-v1) | 0;
        } else if (v1 < 40) {
          v2 = 'No';
          v3 = 100 - (v1 | 0);
        } else if (v1 > 100) {
          v2 = 'Yes';
          v3 = (v1 | 0) - 100;
        }
        
      if (0<window.__changerate && window.__changerate<0.5 ) {
        v4 = ((v1*window.__changerate) | 0) + 50;
        console.log(1, v4);
      } else if (0.5<=window.__changerate && window.__changerate<=1 ) {
        v4 = (v1*window.__changerate) | 0;
        console.log(2, v4)
      }
    }

      const billboardSurface = { name: 'Billboard', tab: 'Predictions' };
      tfvis.render.table(billboardSurface, { 
        headers: ['Would this song make it onto billboard?','Confidence Percentage'], 
        values: [[v2, v3]] 
      });

      const spotifySurface = { name: 'Spotify', tab: 'Predictions' };
      tfvis.render.table(spotifySurface, { 
        headers: ['Predicted Spotify Popularity (0~100)'], 
        values: [[v4]] 
      });

    }


    return (
        <button className="Button" type="button" onClick={Predict}>
          Predict
        </button>
    );
  }
  
  export default PredictButton;
  