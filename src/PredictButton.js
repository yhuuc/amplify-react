// import * as tf from "@tensorflow/tfjs";
// import * as tfvis from "@tensorflow/tfjs-vis";
// import * as tf from 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js';
// import * as tfvis from 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-vis';
import Essentia from 'https://cdn.jsdelivr.net/npm/essentia.js@0.1.3/dist/essentia.js-core.es.js';
// import essentia-wasm-module
import { EssentiaWASM } from 'https://cdn.jsdelivr.net/npm/essentia.js@0.1.3/dist/essentia-wasm.es.js';
import Predict from './Predict';

function PredictButton() {
    // const predict = () => {
    //   console.log("Predicte button clicked");
    //   // model inference
    //   const visorInstance = tfvis.visor();
    //   visorInstance.surface({
    //     name: "Audio Analysis",
    //     tab: "Feature Extraction",
    //   });
    //   // insert data
    //   visorInstance.toggle();
    // };



    // async function train(model, data, fitCallbacks) {
    //     const BATCH_SIZE = 64;
    //     const trainDataSize = 500;
    //     const testDataSize = 100;
    //     const [trainXs, trainYs] = tf.tidy(() => {
    //       const d = data.nextTrainBatch(trainDataSize);
    //       return [d.xs.reshape([trainDataSize, 28, 28, 1]), d.labels];
    //     });
    //     const [testXs, testYs] = tf.tidy(() => {
    //       const d = data.nextTestBatch(testDataSize);
    //       return [d.xs.reshape([testDataSize, 28, 28, 1]), d.labels];
    //     });
    //     return model.fit(trainXs, trainYs, {
    //       batchSize: BATCH_SIZE,
    //       validationData: [testXs, testYs],
    //       epochs: 10,
    //       shuffle: true,
    //       callbacks: fitCallbacks,
    //     });
    //   }
      
    //   async function watchTraining() {
    //     const metrics = ["loss", "val_loss", "acc", "val_acc"];
    //     const container = {
    //       name: "show.fitCallbacks",
    //       tab: "Training",
    //       styles: {
    //         height: "1000px",
    //       },
    //     };
    //     const callbacks = tfvis.show.fitCallbacks(container, metrics);
    //     return train(model, data, callbacks);
    //   }

    

      // async function predict () {
      //   const tensor = tf.tensor1d([0, 0, 0, 0, 2, 3, 4]);

      //   const surface = {name: 'Values Distribution', tab: 'Prediction'};
      //   await tfvis.show.valuesDistribution(surface, tensor);
      //   tfvis.visor().setActiveTab('Prediction')
      //   // disable the button
      // }
      async function Predict() {


    //     const essentia = new Essentia(EssentiaWASM);
    //     const audioCtx = new AudioContext();
    
    //     // let audioURL = "https://song-popularity-predictor-bucket.s3.ap-southeast-2.amazonaws.com/Sleepmakeswaves+-+It's+Dark%2C+It's+Cold%2C+It's+Winter.mp3";
    //     let audioURL = "https://song-popularity-predictor-bucket.s3.ap-southeast-2.amazonaws.com/" + window.__filename;
    //     console.log("audio link:",audioURL)

    //     let buffer = essentia.getAudioBufferFromURL( audioURL, audioCtx )
    //     console.log(buffer)
    
    //     essentia.shutdown();
    // // delete EssentiaJS instance, free JS memory
    //     essentia.delete();
    }


    return (
        <button className="Button" type="button" onClick={Predict}>
          Predict
        </button>
    );
  }
  
  export default PredictButton;
  