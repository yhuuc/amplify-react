// import logo from './logo.svg';
import './index.css';
import ButtonStack from './ButtonStack';
import SongUploader from './SongUploader';

function App() {

  return (
    <div className="App">
        <header className="App-header">
          <div className="Shadow-box">
            <h1 className="App-title">Song Popularity Predictor</h1>
          </div>
          <h2 className="App-subtitle">Based on <i>billboard</i> ranking</h2>
        </header>
      <br />
        <div className='App-body'>
        <ButtonStack />
        <SongUploader />
        </div>
    </div>
  );
}

export default App;
