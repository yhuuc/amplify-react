// was used to test audio url validity because of error, turns out just caused by empty row at the end of the csv file
const path = require('path');
const fs = require('fs');
const Papa = require('papaparse');
const esPkg = require('essentia.js');
const { AudioContext } = require('node-web-audio-api');

async function test() {
    console.log("starting");
    const csvPath = path.resolve(__dirname, 'popular_songs.csv');
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
        const buffer = await essentia.getAudioBufferFromURL( audioURL, audioCtx );
        console.log(row.song)
    }
}

test().catch(err => console.error(err))