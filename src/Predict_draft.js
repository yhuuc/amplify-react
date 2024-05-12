// import * as tf from 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js';
// import * as tfvis from 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-vis';
import Essentia from 'https://cdn.jsdelivr.net/npm/essentia.js@0.1.3/dist/essentia.js-core.es.js';
// // import essentia-wasm-module


import * as tf from "@tensorflow/tfjs";
import { EssentiaWASM } from 'https://cdn.jsdelivr.net/npm/essentia.js@0.1.3/dist/essentia-wasm.es.js';
import { EssentiaTFInputExtractor,TensorflowMusiCNN } from 'https://cdn.jsdelivr.net/npm/essentia.js@0.1.3/dist/essentia.js-model.es.js';


// import * as tf from 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js';
// import * as tf from 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.19.0/dist/index.js';



// import { EssentiaWASM } from 'https://cdn.jsdelivr.net/npm/essentia.js@0.1.1/dist/essentia-wasm.web.js';
// import { EssentiaTFInputExtractor,TensorflowMusiCNN } from 'https://cdn.jsdelivr.net/npm/essentia.js@0.1.1/dist/essentia.js-model.js';
// import * as tf from "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs";

// async function Predict(audioBuffer) {
//     console.log(audioBuffer)
//     const essentia = new Essentia(EssentiaWASM);
    
//     // prints version of essentia wasm backend
//     console.log(essentia.version)
//     // prints all the available algorithm methods in Essentia
//     console.log(essentia.algorithmNames)

//     // const inputSignalVector = essentia.arrayToVector(audioBuffer.getChannelData(0));

//     // let outputRG = essentia.ReplayGain(inputSignalVector);
    
//     // console.log(outputRG.ReplayGain);
    
//     // let outputPyYin = essentia.PitchYinProbabilistic(
//     //   inputSignalVector, // input
//     //   // parameters (optional)
//     //   4096, // frameSize
//     //   256, // hopSize
//     //   0.1, // lowRMSThreshold
//     //   "zero", // outputUnvoiced,
//     //   false, // preciseTime
//     //   44100
//     // ); //sampleRate
    
//     // let pitches = essentia.vectorToArray(outputPyYin.pitch);
//     // let voicedProbabilities = essentia.vectorToArray(
//     //   outputPyYin.voicedProbabilities
//     // );
    
//     // console.log(pitches);
//     // console.log(voicedProbabilities);
    
//     // outputPyYin.pitch.delete();
//     // outputPyYin.voicedProbabilities.delete();
  
    
//     // CAUTION: only use the `shutdown` and `delete` methods below if you've finished your analysis and don't plan on re-using Essentia again in your program lifecycle.
//     // call internal essentia::shutdown C++ method
//     essentia.shutdown();
//     // delete EssentiaJS instance, free JS memory
//     essentia.delete();
// }



// async function Predict (audioURL) {
//   console.log(tf)
//   // model variables
//   // const audioCtx = new (AudioContext || new webkitAudioContext())();
//   const audioCtx = new AudioContext();
//   const modelURL = "./msd-musicnn-1/model.json";
//   const extractor = new EssentiaTFInputExtractor(EssentiaWASM, "musicnn");
//   let musicnn = new TensorflowMusiCNN(tf, modelURL, true);
//   let buffer = extractor.getAudioBufferFromURL(audioURL, audioCtx)

//   const audioData = await extractor.downsampleAudioBuffer(buffer);
//   const features = await extractor.computeFrameWise(audioData, 256);
//   await musicnn.initialize();
//   const predictions = await musicnn.predict(features, true);
//   console.log(predictions)
// }



// async function Predict (audioBuffer) {
//   console.log(tf)
//   const essentia = new Essentia(EssentiaWASM);
//   let audioSignal = essentia.audioBufferToMonoSignal(audioBuffer);
//   // model variables
//   const inputFeatureExtractor = new EssentiaTFInputExtractor(EssentiaWASM, "musicnn");
//   // Compute feature for a given audio signal
//   let inputMusiCNN = inputFeatureExtractor.computeFrameWise(audioSignal);
//   // INFERENCE
//   const modelURL = "./autotagging/msd/msd-musicnn-1/model.json"
//   // Where `tf` is the global import object from the `@tensorflow/tfjs*` package.
//   const musicnn = new TensorflowMusiCNN(tf, modelURL);
//   // Promise for loading the model
//   await musicnn.initialize();
//   // Compute predictions for a given input feature.
//   let predictions = await musicnn.predict(inputMusiCNN);
//   console.log(predictions)
// }

// async function Predict () {
//   console.log(tf)
//   let audioURL = "https://song-popularity-predictor-bucket.s3.ap-southeast-2.amazonaws.com/Sleepmakeswaves+-+It's+Dark%2C+It's+Cold%2C+It's+Winter.mp3"
//   // model variables
//   // const audioCtx = new (AudioContext || new webkitAudioContext())();
//   const audioCtx = new AudioContext();
//   const modelURL = "./msd-musicnn-1/model.json";
//   const extractor = new EssentiaTFInputExtractor(EssentiaWASM, "musicnn");
//   let musicnn = new TensorflowMusiCNN(tf, modelURL, true);
//   let buffer = extractor.getAudioBufferFromURL(audioURL, audioCtx)

//   const audioData = await extractor.downsampleAudioBuffer(buffer);
//   const features = await extractor.computeFrameWise(audioData, 256);
//   await musicnn.initialize();
//   const predictions = await musicnn.predict(features, true);
//   console.log(predictions)
// }

async function Predict() {
  const essentia = new Essentia(EssentiaWASM);
  const audioCtx = new AudioContext();
  let audioURL = "https://song-popularity-predictor-bucket.s3.ap-southeast-2.amazonaws.com/Sleepmakeswaves+-+It's+Dark%2C+It's+Cold%2C+It's+Winter.mp3";
  // decode audio data
  const modelURL = "./msd-musicnn-1/model.json";
  let extractor = null;
  let musicnn = new TensorflowMusiCNN(tf, modelURL, true);
  console.log(0);
    // load Essentia WASM backend

      extractor = new EssentiaTFInputExtractor(EssentiaWASM, "musicnn", false);
      // fetch audio and decode, then analyse
      extractor.getAudioBufferFromURL(audioURL, audioCtx).then(analyse);
  console.log(1);
  // analyse on click
  async function analyse(buffer) {
    console.log(2);
    const audioData = await extractor.downsampleAudioBuffer(buffer);
    const features = await extractor.computeFrameWise(audioData, 256);
    await musicnn.initialize();
    const predictions = await musicnn.predict(features, true);
  
    // creates a new div to display the predictions and appends to DOM
    console.log(3);
    console.log(predictions);
  }
  // CAUTION: only use the `shutdown` and `delete` methods below if you've finished your analysis and don't plan on re-using Essentia again in your program lifecycle.
  
  // call internal essentia::shutdown C++ method
  essentia.shutdown();
  // delete EssentiaJS instance, free JS memory
  essentia.delete();
}


export default Predict;