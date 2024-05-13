// import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';
import Essentia from 'https://cdn.jsdelivr.net/npm/essentia.js@0.1.3/dist/essentia.js-core.es.js';
import { EssentiaWASM } from 'https://cdn.jsdelivr.net/npm/essentia.js@0.1.3/dist/essentia-wasm.es.js';
// import { EssentiaTFInputExtractor,TensorflowMusiCNN } from 'https://cdn.jsdelivr.net/npm/essentia.js@0.1.3/dist/essentia.js-model.es.js';

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



// async function Extract() {
//   // let audioURL = "https://bucket-name.region.amazonaws.com/" + window.__filename;
//   // let audioURL = "https://song-popularity-predictor-bucket.s3.ap-southeast-2.amazonaws.com/" + window.__filename;
//   // let audioURL = window.__filelink;
//   let audioURL = "https://p.scdn.co/mp3-preview/5184d19d1b7fcc3e7c067e38af45a7cc80851440?cid=cfe923b2d660439caf2b557b21f31221";

//   const audioCtx = new AudioContext();
//   // const modelURL = "https://essentia.upf.edu/models/autotagging/msd/msd-musicnn-1.pb";
//   const modelURL = "model.json"; //github python config
//   const proxyURL = "https://thingproxy.freeboard.io/fetch/";
//   const URL = proxyURL + modelURL;

//   const essentia = new Essentia(EssentiaWASM);
//   let buffer = await essentia.getAudioBufferFromURL( audioURL, audioCtx );

//   let musicnn = new TensorflowMusiCNN(tf, modelURL);
//   console.log("Musicnn model initialized:", musicnn);

//   const extractor = new EssentiaTFInputExtractor(EssentiaWASM, "musicnn");
//   console.log(0)
//   const audioData = await extractor.downsampleAudioBuffer(buffer);
//   const features = await extractor.computeFrameWise(audioData, 256);
//   console.log(3, audioData, features)
//   await musicnn.initialize();
//   console.log(4)
//   const predictions = await musicnn.predict(features, true);
//   console.log(predictions);

// }
        


      // let audioBuffer = await essentia.getAudioBufferFromURL( audioURL, audioCtx )
      // console.log(audioBuffer);
      // console.log(AudioBuffer)
      // audioBuffer.then(AudioBuffer => {
      //   console.log(AudioBuffer)
      //   // console.log(AudioBuffer.getChannelData(0));
      //   // console.log(AudioBuffer.getChannelData(1)); 
      // })
    
    //   essentia.shutdown();
    // // delete EssentiaJS instance, free JS memory
    //   essentia.delete();
    
  // }


async function Extract() {

        const essentia = new Essentia(EssentiaWASM);
        const audioCtx = new AudioContext();
    
        let audioURL = window.__filename;
        // const flowers = "https://p.scdn.co/mp3-preview/5184d19d1b7fcc3e7c067e38af45a7cc80851440?cid=cfe923b2d660439caf2b557b21f31221";
        // const killbill = "https://p.scdn.co/mp3-preview/49dfe4ea78c5d3c5d2923d4a34c50fc4709855cb?cid=cfe923b2d660439caf2b557b21f31221";
        // const handstand = "https://p.scdn.co/mp3-preview/c55b106ce42d91f075157fde497d392098b49a4c?cid=6a78982078cb477d900388b0470ad9ad";
        // let audioURL = flowers;

        console.log("audio link:",audioURL)

        let buffer = await essentia.getAudioBufferFromURL( audioURL, audioCtx );
        console.log(0,buffer);
        let signal = essentia.arrayToVector(essentia.audioBufferToMonoSignal(buffer));
        console.log(1,signal);
        
        let vector1 = essentia.arrayToVector(buffer.getChannelData(0));
        let vector2 = essentia.arrayToVector(buffer.getChannelData(1));
        // console.log(2,vector1);

        // Autocorrelation, takes array, outputs object
        // auto1 = essentia.AutoCorrelation(vector1);
        // auto2 = essentia.AutoCorrelation(vector1);
        
        // Loudness
        let loudness  = essentia.LoudnessEBUR128(vector1, vector2);
        console.log(2, loudness);

        // BPM
        let rhythm = essentia.RhythmExtractor(signal);  //bpmIntervals.ticks is a vector
        console.log(3,rhythm);

        // Key
        let key = essentia.KeyExtractor(signal);
        console.log(4, key);

        // Tonality
        let tonal = essentia.TonalExtractor(signal);
        console.log(5,tonal);

        // frames
        // let frames = essentia.FrameGenerator(buffer.getChannelData(0))
        // console.log(6,frames);
        //chromagram
        // let spectrum = essentia.Spectrum( signal );
        // console.log(7,spectrum);
        // let hpcp = essentia.HPCP(spectrum.spectrum)
        // console.log(8,hpcp.hpcp);

        // BPM Histogram
        const bpmSurface = { name: 'BPM Histogram', tab: 'Audio Analysis' };
        tfvis.render.histogram(bpmSurface, essentia.vectorToArray(rhythm.estimates), {color:'#6C5B7B'});

        // Loudness Historgrams
        const loudnessSurface1 = { name: 'Momentary Loudness', tab: 'Audio Analysis' };
        tfvis.render.histogram(loudnessSurface1, essentia.vectorToArray(loudness.momentaryLoudness), {color:'#C06C84'});
        const loudnessSurface2 = { name: 'Short Term Loudness', tab: 'Audio Analysis' };
        tfvis.render.histogram(loudnessSurface2, essentia.vectorToArray(loudness.shortTermLoudness), {color:'#F67280'});

        // Tonal Historgram
        const tonalSurface = { name: 'Chords', tab: 'Audio Analysis' };
        tfvis.render.histogram(tonalSurface, essentia.vectorToArray(tonal.chords_histogram), {color:'#355C7D'});

        // console.log(10,tonal.hpcp.size);
        // const hfccvalues = [];
        // for (let i = 0; i < 20; i++) {
        //     hfccvalues.push(essentia.vectorToArray(tonal.hpcp.get(i)));
        //   }
        // console.log(11,hfccvalues);
        const hfccSurface = { name: 'HPCP', tab: 'Audio Analysis' };
        tfvis.render.heatmap(hfccSurface, { values:[
          essentia.vectorToArray(tonal.hpcp.get(0)), 
          essentia.vectorToArray(tonal.hpcp.get(1)),
          essentia.vectorToArray(tonal.hpcp.get(2)),
          essentia.vectorToArray(tonal.hpcp.get(3)),
          essentia.vectorToArray(tonal.hpcp.get(4)),
          essentia.vectorToArray(tonal.hpcp.get(5)),
          essentia.vectorToArray(tonal.hpcp.get(6)),
          essentia.vectorToArray(tonal.hpcp.get(7)),
          essentia.vectorToArray(tonal.hpcp.get(8)),
          essentia.vectorToArray(tonal.hpcp.get(9)),
          essentia.vectorToArray(tonal.hpcp.get(10)), 
          essentia.vectorToArray(tonal.hpcp.get(11)),
          essentia.vectorToArray(tonal.hpcp.get(12)),
          essentia.vectorToArray(tonal.hpcp.get(13)),
          essentia.vectorToArray(tonal.hpcp.get(14)),
          essentia.vectorToArray(tonal.hpcp.get(15)),
          essentia.vectorToArray(tonal.hpcp.get(16)),
          essentia.vectorToArray(tonal.hpcp.get(17)),
          essentia.vectorToArray(tonal.hpcp.get(18)),
          essentia.vectorToArray(tonal.hpcp.get(19)),
        ]}, {xLabel:'Frame'});
        // const waveSurface = { name: 'Wave', tab: 'Audio Analysis' };
        // tfvis.render.linechart(waveSurface, essentia.vectorToArray(rhythm.ticks));

        // Audio Features Table
        const tableSurface = { name: 'Audio Features', tab: 'Feature Extraction' };
        const headers = ['BPM','Loudness','Key','Scale','Key Strength', 'Chords Changes Rate', 'Chords Key', 'Chords Number Rate'];
        let tableValues = [[rhythm.bpm, 
          loudness.integratedLoudness, 
          key.key, 
          key.scale, 
          key.strength,          
          tonal.chords_changes_rate,
          tonal.chords_key,
          tonal.chords_number_rate,]];
        tfvis.render.table(tableSurface, { headers, values:tableValues });
        
          // global variables
        window.__bpm = rhythm.bpm;
        window.__loudness = loudness.integratedLoudness;
        window.__strength = key.strength;
        window.__changerate = tonal.chords_changes_rate*10;

        essentia.shutdown();
    // delete EssentiaJS instance, free JS memory
        essentia.delete();
        console.log('finish');

  }

  return (
      <button className="Button" type="button" onClick={Extract}>
        Extract Features
      </button>
  )
}

export default FeatureExtractionButton;