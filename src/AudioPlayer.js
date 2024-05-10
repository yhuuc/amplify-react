import React from "react";

class AudioPlayer extends React.Component {
  render(song) {
    return (
      <div style={{ margin: "2%" }}>
        <audio src={song} controls />
      </div>
    );
  }
}

export default AudioPlayer;
