// import logo from './logo.svg';
import "./index.css";
import PredictButton from "./PredictButton";
import ShowButton from "./ShowButton";
import ModelButton from "./ModelButton";
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
      <br />
      <div className="App-body">
        <div className="Button-stack">
              <PredictButton />
              <br />
              <ShowButton />
              {/* <br /> */}
              {/* <ModelButton /> */}
        </div>
        <div className="Song-uploader">
              <SongUploader />
        </div>
      </div>
    </div>
  );
}

export default App;
