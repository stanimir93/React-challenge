import "./playermenu.css";
import React from "react";
import {
  FaTimes,
  FaChevronDown,
  FaChevronUp,
  FaMusic,
  FaStepBackward,
  FaStepForward,
  FaPlay,
  FaPause,
} from "react-icons/fa";
import { useMusic } from "../../contexts/MusicContext";

export default function PlayerMenu(props) {
  const music = useMusic();
  const { nextId, prevId, playThis, currName, closePlayer, playerState, handlePlayPause } = music;
  const { playerRef, playlistRef, playerMinimized, playlistHidden, setPlayerMinimized, setPlaylistHidden } = props;

  // Minimize Player
  function handleMinimize() {
    playerRef.current.classList.toggle("minimized");
    playerRef.current.classList.contains("minimized") ? setPlayerMinimized(true) : setPlayerMinimized(false);
  }
  // Show/Hide Playlist
  function togglePlaylist() {
    playlistRef.current.classList.toggle("hidden");
    playlistRef.current.classList.contains("hidden") ? setPlaylistHidden(true) : setPlaylistHidden(false);
  }

  return (
    <div>
      {/* Show song name if minimized */}
      {playerMinimized && <p className='currently-playing-title'>{currName}</p>}
      <div className='player-menu'>
        {/* Playback control */}
        <div className='player-menu__playback-controls'>
          <button onClick={() => playThis(prevId)} title='Previous'>
            <FaStepBackward />
          </button>
          <button onClick={handlePlayPause} title={playerState === 1 ? "Pause" : "Play"}>
            {playerState === 1 ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={() => playThis(nextId)} title='Next'>
            <FaStepForward />
          </button>
        </div>
        {/* Player window control */}
        <div className='player-menu__window-controls'>
          <button onClick={togglePlaylist} title={playlistHidden ? "Show Playlist" : "Hide Playlist"}>
            <FaMusic />
          </button>
          <button onClick={handleMinimize} title={playerMinimized ? "Maximize Player" : "Minimize Player"}>
            {playerMinimized ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          <button onClick={closePlayer} id='close-btn' title='Close Player'>
            <FaTimes />
          </button>
        </div>
      </div>
    </div>
  );
}
