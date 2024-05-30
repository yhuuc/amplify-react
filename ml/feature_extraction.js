// import Essentia from 'https://cdn.jsdelivr.net/npm/essentia.js@0.1.3/dist/essentia.js-core.es.js';
// import { EssentiaWASM } from 'https://cdn.jsdelivr.net/npm/essentia.js@0.1.3/dist/essentia-wasm.es.js';
// import path from 'path';
// import fs from 'fs';
// import Papa from 'papaparse';
// import esPkg from 'essentia.js';

const path = require('path');
const fs = require('fs');
const Papa = require('papaparse');
const esPkg = require('essentia.js');
const { AudioContext } = require('node-web-audio-api');

async function ExtractFeature(sourceFile, destinatonFile) {
  
    console.log("starting");
    const csvPath = path.resolve(__dirname, sourceFile);
    const csvData = fs.readFileSync(csvPath, 'utf8');
    
    // Parse CSV data
    const parsedData = Papa.parse(csvData, { header: true });
    const rows = parsedData.data;
    console.log("csv file parsed");
    // const essentia = new Essentia(EssentiaWASM);
    const essentia = new esPkg.Essentia(esPkg.EssentiaWASM);
    const audioCtx = new AudioContext();

    console.log("essentia initiated");
    for (const row of rows) {

        const audioURL = row.audio_link;

        // Fetch and process audio data from audio link
        let buffer = await essentia.getAudioBufferFromURL( audioURL, audioCtx );
        let signal = essentia.arrayToVector(essentia.audioBufferToMonoSignal(buffer));
        
        let vector1 = essentia.arrayToVector(buffer.getChannelData(0));
        let vector2 = essentia.arrayToVector(buffer.getChannelData(1));

        // Extract features
        let loudness  = essentia.LoudnessEBUR128(vector1, vector2);
        let rhythm = essentia.RhythmExtractor(signal);  //bpm
        let key = essentia.KeyExtractor(signal);
        let tonal = essentia.TonalExtractor(signal);  //tonality

        // Add extracted features to rows
        row.bpm = rhythm.bpm;
        row.loudness = loudness.integratedLoudness;
        row.key = key.key;
        row.key_scale = key.scale;
        row.key_strength = key.strength;
        row.chords_changes_rate = tonal.chords_changes_rate;
        row.chords_key = tonal.chords_key;
        row.chords_number_rate = tonal.chords_number_rate;

        // Track progress
        console.log(row.song)
    }
  console.log("shutting down essentia");
  essentia.shutdown();
  essentia.delete();
  // Convert all data back to CSV
  const newCSV = Papa.unparse(rows);

  // Save new CSV
  const outputPath = path.resolve(__dirname, destinatonFile);
  fs.writeFileSync(outputPath, newCSV, 'utf8');
  console.log("completed");
}

async function AssembleData () {
  // I manully fixed the bug by running them one by one
  // await ExtractFeature("popular_songs.csv", "popular_features.csv");
  await ExtractFeature("unpopular_songs.csv", "unpopular_features.csv");

  // Paths to the CSV files
  const csvPath1 = path.resolve(__dirname, 'popular_features.csv');
  const csvPath2 = path.resolve(__dirname, 'unpopular_features.csv');

  // Read and parse the CSV files
  const csvData1 = fs.readFileSync(csvPath1, 'utf8');
  const csvData2 = fs.readFileSync(csvPath2, 'utf8');
  const parsedData1 = Papa.parse(csvData1, { header: true });
  const parsedData2 = Papa.parse(csvData2, { header: true });

  // Stack rows from both files
  const stackedRows = parsedData1.data.concat(parsedData2.data);

  // Delete specific columns (e.g., 'Column1', 'Column2')
  const columnsToDelete = ['album', 'album_id','artist','year','track_id','audio_link'];
  const filteredRows = stackedRows.map(row => {
      columnsToDelete.forEach(column => delete row[column]);
      return row;
  });

  // Save the modified data to a new CSV file
  const newCsvData = Papa.unparse(filteredRows, { header: true });
  const outputPath = path.resolve(__dirname, 'train.csv');
  fs.writeFileSync(outputPath, newCsvData, 'utf8');
}

AssembleData().catch(err => console.error(err));