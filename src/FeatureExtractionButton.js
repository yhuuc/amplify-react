import * as tfvis from '@tensorflow/tfjs-vis';
import Essentia from 'https://cdn.jsdelivr.net/npm/essentia.js@0.1.3/dist/essentia.js-core.es.js';
import { EssentiaWASM } from 'https://cdn.jsdelivr.net/npm/essentia.js@0.1.3/dist/essentia-wasm.es.js';
// const tfvis = require('@tensorflow/tfjs-vis');

function FeatureExtractionButton () {
async function Extract() {

        if (window.__filelink === undefined) {
          alert("Please upload an audio file first.");
          return;
        }

        const essentia = new Essentia(EssentiaWASM);
        const audioCtx = new AudioContext();
    
        let audioURL = window.__filelink;
        //testing links
        // const flowers = "https://p.scdn.co/mp3-preview/5184d19d1b7fcc3e7c067e38af45a7cc80851440?cid=cfe923b2d660439caf2b557b21f31221";
        // const killbill = "https://p.scdn.co/mp3-preview/49dfe4ea78c5d3c5d2923d4a34c50fc4709855cb?cid=cfe923b2d660439caf2b557b21f31221";
        // const handstand = "https://p.scdn.co/mp3-preview/c55b106ce42d91f075157fde497d392098b49a4c?cid=6a78982078cb477d900388b0470ad9ad";
        // const oldtownroad = "https://p.scdn.co/mp3-preview/32744d501b733e5b31d25448540e365db2600c45?cid=6a78982078cb477d900388b0470ad9ad";
        // const asitwas = "https://p.scdn.co/mp3-preview/c43dd07043b29e800c1a65b3a0102861fa3cf418?cid=6a78982078cb477d900388b0470ad9ad"
        // let audioURL = handstand;

        let buffer = await essentia.getAudioBufferFromURL( audioURL, audioCtx );
        console.log(0,buffer);
        let signal = essentia.arrayToVector(essentia.audioBufferToMonoSignal(buffer));
        console.log(1,signal);
        
        let vector1 = essentia.arrayToVector(buffer.getChannelData(0));
        let vector2 = essentia.arrayToVector(buffer.getChannelData(1));
        
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

        // Data visualisation
        const visorInstance = tfvis.visor();
        if (!visorInstance.isOpen()) {
          visorInstance.toggle();
        }
        
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

        const values = [];
        for (let i = 0; i < 50; i++) {
            values.push(essentia.vectorToArray(tonal.hpcp.get(i)));
        }

        const hfccSurface = { name: 'HPCP', tab: 'Audio Analysis' };
        tfvis.render.heatmap(
          hfccSurface, 
          { values: values }, 
          { xLabel: 'Frame' }
      );

        const features = [rhythm.bpm, 
                          loudness.integratedLoudness, 
                          key.key,
                          key.scale,
                          key.strength,
                          tonal.chords_changes_rate,
                          tonal.chords_key,
                          tonal.chords_number_rate]
        // Audio Features Table
        const tableSurface = { name: 'Audio Features', tab: 'Feature Extraction' };
        const headers = ['BPM','Loudness','Key','Scale','Key Strength', 'Chords Changes Rate', 'Chords Key', 'Chords Number Rate'];
        tfvis.render.table(tableSurface, { headers, values: [features] });

        // global variables for prediction
        window.__bpm = rhythm.bpm;
        window.__loudness = loudness.integratedLoudness;
        window.__key = key.key;
        window.__scale = key.scale;
        window.__strength = key.strength;
        window.__chords_changes_rate = tonal.chords_changes_rate;
        window.__chords_key = tonal.chords_key;
        window.__chords_number_rate = tonal.chords_number_rate;

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