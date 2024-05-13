// import logo from './logo.svg';
import './index.css';
import * as tfvis from "@tensorflow/tfjs-vis";
import PredictButton from './PredictButton';
import ShowButton from './ShowButton';
import FeatureExtractionButton from './FeatureExtractionButton';
import AudioPlayer from './AudioPlayer';
import SongUploader from "./SongUploader";

function App() {
  //initialize a visor instance
  const visorInstance = tfvis.visor();
  visorInstance.close();
  // // create a drop box
  // const onDrop = useCallback(acceptedFiles => {
  //   console.log(acceptedFiles);
  //   acceptedFiles.forEach((file) => {
  //     const reader = new FileReader()

  //     reader.onabort = () => console.log('file reading was aborted')
  //     reader.onerror = () => console.log('file reading has failed')
  //     reader.onload = () => {
  //     // Do whatever you want with the file contents
  //       const binaryStr = reader.result
  //       console.log(binaryStr)
  //       // Predict(binaryStr);
  //     }
  //   })
  // }, [])

  // const {acceptedFiles,getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
 

  return (
    <div className="App">
      <header className="App-header">
        <div className="Shadow-box">
          <h1 className="App-title">Song Popularity Predictor</h1>
        </div>
        <h2 className="App-subtitle">
          Based on <i>billboard</i> and <i>Spotify</i>
        </h2>
      </header>
      <p>&#9312; <em>Upload audio file</em> &#9313; <em>Extract audio features</em> &#9314; <em>Make prediction</em> &#9315; <em>See charts</em></p>
      <div className="App-body">
        <section className="Container">
              <ShowButton />
              <br />
              <FeatureExtractionButton />
              <br />
              <PredictButton />
        </section>
        <SongUploader />
      </div>
    </div>
  );
}

export default App;
