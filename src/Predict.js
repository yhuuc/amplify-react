import Essentia from 'https://cdn.jsdelivr.net/npm/essentia.js@0.1.3/dist/essentia.js-core.es.js';
import * as tf from "@tensorflow/tfjs";
import { EssentiaWASM } from 'https://cdn.jsdelivr.net/npm/essentia.js@0.1.3/dist/essentia-wasm.es.js';
import { EssentiaTFInputExtractor,TensorflowMusiCNN } from 'https://cdn.jsdelivr.net/npm/essentia.js@0.1.3/dist/essentia.js-model.es.js';


async function Predict() {

    const essentia = new Essentia(EssentiaWASM);
    const audioCtx = new AudioContext();

    // let audioURL = "https://song-popularity-predictor-bucket.s3.ap-southeast-2.amazonaws.com/Sleepmakeswaves+-+It's+Dark%2C+It's+Cold%2C+It's+Winter.mp3";
    let audioURL = "https://song-popularity-predictor-bucket.s3.ap-southeast-2.amazonaws.com/" + window.__filename;
    console.log("audio link:",audioURL)
    let buffer = essentia.getAudioBufferFromURL( audioURL, audioCtx )
    console.log(buffer)

    essentia.shutdown();
// delete EssentiaJS instance, free JS memory
    essentia.delete();
}

export default Predict;