import "./playermenu.css";
import React, { useContext } from "react";
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
import { MusicContext } from "../../contexts/MusicContext";

export default function PlayerMenu(props) {
  const music = useContext(MusicContext);
  const { nextId, prevId, playThis, currName, closePlayer, playerState, handlePlayPause } = music;
  const { playerRef, playlistRef, playerMinimized, setPlayerMinimized, setPlaylistHidden } = props;

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
      {/* Show song same if minimized */}
      {playerMinimized && <p className='currently-playing-title'>{currName}</p>}
      <div className='player-menu'>
        {/* Playback control */}
        <div className='player-menu__playback-controls'>
          <button onClick={() => playThis(prevId)}>
            <FaStepBackward />
          </button>
          <button onClick={handlePlayPause}>{playerState === 1 ? <FaPause /> : <FaPlay />}</button>
          <button onClick={() => playThis(nextId)}>
            <FaStepForward />
          </button>
        </div>
        {/* Player window control */}
        <div className='player-menu__window-controls'>
          <button onClick={togglePlaylist}>
            <FaMusic />
          </button>
          <button onClick={handleMinimize}>{playerMinimized ? <FaChevronUp /> : <FaChevronDown />}</button>
          <button onClick={closePlayer} id='close-btn' title='Close Player'>
            <FaTimes />
          </button>
        </div>
      </div>
    </div>
  );
}
