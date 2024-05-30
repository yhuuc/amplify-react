import './index.css';
import PredictButton from './PredictButton';
import ShowButton from './ShowButton';
import FeatureExtractionButton from './FeatureExtractionButton';
import SongUploader from "./SongUploader";

function App() {
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
      <p>&#9312; <em>Upload audio file (wav, mp3, ogg, flac, etc.) </em> 
         &#9313; <em>Extract audio features </em> 
         &#9314; <em>Make prediction </em> 
         &#9315; <em>See charts</em> </p>
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
