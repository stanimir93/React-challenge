import "./playercontrols.css";
import React from "react";

export default function PlayerControls(props) {
  const { song, songs, next, prev } = props;

  // Next Song
  function handleNext() {
    setPlaying(songs.at(next));
  }
  // Prev Song
  function handlePrev() {
    setPlaying(songs.at(prev));
  }
  // Play/Pause Song
  function handlePlay() {
    if (window.player.getPlayerState() === 1) window.player.pauseVideo();
    else window.player.playVideo();
  }

  return (
    <div>
      <span>{song}</span>

      <div className='player__controls'>
        <button onClick={handlePrev}>Prev</button>
        <button onClick={handlePlay}>Play/Pause</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}
