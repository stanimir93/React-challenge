import "./playermenu.css";
import React, { useState } from "react";
import {
  FaTimes,
  FaChevronDown,
  FaChevronUp,
  FaMusic,
  FaPause,
  FaPlay,
  FaStepBackward,
  FaStepForward,
} from "react-icons/fa";

export default function PlayerMenu(props) {
  const {
    setPlaying,
    playerRef,
    playlistRef,
    minimized,
    setMinimized,
    setPlaylistHidden,
    playlistHidden,
    songsArray,
    prevIdx,
    nextIdx,
    playlist,
    eIdPlaying,
  } = props;
  const songName = playlist.current.get(eIdPlaying);
  const [isItPlaying, setIsItPLaying] = useState(window?.ytPlayer?.getPlayerState() !== 1 ? false : true);

  // Minimize Player
  function handleMinimize() {
    playerRef.current.classList.toggle("minimized");
    playerRef.current.classList.contains("minimized") ? setMinimized(true) : setMinimized(false);
  }

  // Show/Hide Playlist
  function togglePlaylist() {
    playlistRef.current.classList.toggle("hidden");
    playlistRef.current.classList.contains("hidden") ? setPlaylistHidden(true) : setPlaylistHidden(false);
  }

  // Close Player
  function closePlayer(ev) {
    console.log("closing from button");
    playlistRef.current = null; //clear playlist on closing the player
    setPlaying(null);
  }

  // Next Song
  function handleNext() {
    setPlaying(songsArray.at(nextIdx));
  }

  // Prev Song
  function handlePrev() {
    setPlaying(songsArray.at(prevIdx));
  }

  // Play/Pause Song
  function handlePlay() {
    if (window?.ytPlayer?.getPlayerState() === 1) window?.ytPlayer?.pauseVideo();
    else window?.ytPlayer?.playVideo();
    setIsItPLaying(window?.ytPlayer?.getPlayerState() === 1);
  }

  return (
    <div>
      {minimized && <p className='currently-playing-title'>{playlist.current.get(eIdPlaying)}</p>}
      <div className='player-menu'>
        <div className='player-menu__playback-controls'>
          <button onClick={handlePrev}>
            <FaStepBackward />
          </button>
          <button onClick={handlePlay}>{!isItPlaying ? <FaPause /> : <FaPlay />}</button>
          <button onClick={handleNext}>
            <FaStepForward />
          </button>
        </div>
        <div className='player-menu__window-controls'>
          <button onClick={togglePlaylist}>
            <FaMusic />
          </button>
          <button onClick={handleMinimize}>{minimized ? <FaChevronUp /> : <FaChevronDown />}</button>
          <button onClick={closePlayer} id='close-btn' title='Close Player'>
            <FaTimes />
          </button>
        </div>
      </div>{" "}
    </div>
  );
}
