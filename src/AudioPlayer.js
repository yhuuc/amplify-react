import React from 'react'

class AudioPlayer extends React.Component {
  render() {
    return (
      <div>
        <audio src="/Sleepmakeswaves - It's Dark, It's Cold, It's Winter.mp3" controls/>
      </div>
    );
  }
}

export default AudioPlayer;