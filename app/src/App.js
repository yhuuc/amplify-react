// import logo from './logo.svg';
import './App.css';
import SongUploader from './SongUploader';

function App() {
  return (
    <div className="App">
        <header className="App-header">
          <div className="Shadow-box">
            <h1 className="App-title">Song Popularity Predictor</h1>
          </div>
          <h2 className="App-subtitle">Based on <i>Billboard</i> ranking</h2>
        </header>
      <br></br>
        <body>
          <div className='Box'>  <SongUploader />  </div>
        </body>
    </div>
  );
}

export default App;
