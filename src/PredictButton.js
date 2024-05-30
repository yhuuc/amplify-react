// import * as tfvis from '@tensorflow/tfjs-vis';
const tfvis = require('@tensorflow/tfjs-vis');
const tf = require('@tensorflow/tfjs');

function PredictButton() {

    async function Predict() {

      if (window.__filelink === undefined) {
        alert("Please upload an audio file first.");
        return;
      } else if (window.__bpm === undefined) {
        alert("Please click Extract Features first.");
        return;
      }

      // Load the model
      const billboard_model = await tf.loadLayersModel('/billboard_model/model.json');
      const spotify_model = await tf.loadLayersModel('/spotify_model/model.json');

      const keyTable = ['A','Ab','B','Bb','C','C#','D','E','Eb','F','F#','G'];

      let key = keyTable;
      for (let i=0; i<12; i++) {
        if (key[i] ===  window.__key){
          key[i] = 1;
        } else {
          key[i] = 0;
      }}

      let scale;
      if (window.__scale === 'major'){
        scale = [1,0];
      } else if (window.__scale === 'minor'){
        scale = [0,1];
      }

      let chords_key = keyTable;
      for (let i=0; i<12; i++) {
        if (chords_key[i] ===  window.__chords_key){
          chords_key[i] = 1;
        } else {
          chords_key[i] = 0;
      }}

      const input = tf.concat([
        tf.tensor1d([window.__bpm]),
        tf.tensor1d([window.__loudness]),
        tf.tensor1d(key),
        tf.tensor1d(scale),
        tf.tensor1d([window.__strength]),
        tf.tensor1d([window.__chords_changes_rate]),
        tf.tensor1d(chords_key),
        tf.tensor1d([window.__chords_number_rate])
      ]).reshape([-1,31]);
      input.data().then(data => {
        console.log(data);
      });

      // Make predictions
      const billboard_prediction = billboard_model.predict(input).arraySync()[0][0];
      let yesOrNo;
      if (billboard_prediction > 0.5 || billboard_prediction === 0.5) {
        yesOrNo="Yes";
      } else if (billboard_prediction <0.5){
        yesOrNo="No";
      }

      let spotify_prediction = spotify_model.predict(input).arraySync()[0][0];
      spotify_prediction = (spotify_prediction/25).toFixed(2)
      if (spotify_prediction<0) {
        spotify_prediction=0;
      } else if (spotify_prediction>100) {
        spotify_prediction=100;
      }

      // project onto tfvis board
      const billboardSurface = { name: 'Billboard', tab: 'Predictions' };
      tfvis.render.table(billboardSurface, { 
        headers: ['Would this song make it onto billboard?','Possibility'], 
        values: [[yesOrNo, (billboard_prediction*100).toFixed(2)+'%']] 
      });

      const spotifySurface = { name: 'Spotify', tab: 'Predictions' };
      tfvis.render.table(spotifySurface, { 
        headers: ['Predicted Spotify Popularity (0~100)'], 
        values: [[spotify_prediction]] 
      });
  }

    return (
        <button className="Button" type="button" onClick={Predict}>
          Predict
        </button>
    );
  }
  
  export default PredictButton;
  