import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";

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

    
      async function predict () {
        const tensor = tf.tensor1d([0, 0, 0, 0, 2, 3, 4]);

        const surface = {name: 'Values Distribution', tab: 'Prediction'};
        await tfvis.show.valuesDistribution(surface, tensor);
        tfvis.visor().setActiveTab('Prediction')
        // disable the button
      }

    return (
        <button className="Button" type="button" onClick={predict}>
          Predict
        </button>
    );
  }
  
  export default PredictButton;
  