// import logo from './logo.svg';
import './App.css';
import SongUploader from './SongUploader';

function App() {
  return (
    <div className="App">
        <header className="App-header">
          <div id="Shadow">
          <h1 className="App-title">Song Popularity Predictor</h1>
          </div>
          <h2 className="App-subtitle">Billboard Ranking</h2>
          
          {/* <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a> */}
        </header>
      <br></br>
        <body>
          <div className='Box'>  <SongUploader />  </div>
        </body>
    </div>
  );
}

export default App;
