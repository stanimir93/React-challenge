import "./playermenu.css";
import React from "react";

export default function PlayerMenu(props) {
  const { setPlaying, player, playlist, minimized, setMinimized, setPlaylistHidden, playlistHidden } = props;

  // Minimize Player
  function handleMinimize() {
    player.classList.toggle("minimized");
    player.classList.contains("minimized") ? setMinimized(true) : setMinimized(false);
  }

  // Show/Hide Playlist
  function togglePlaylist() {
    playlist.classList.toggle("hidden");
    playlist.classList.contains("hidden") ? setPlaylistHidden(true) : setPlaylistHidden(false);
  }

  // Close Player
  function closePlayer() {
    playlist.current = null; //clear playlist on closing the player
    setPlaying(null);
  }
  return (
    <div className='player__menu'>
      <button onClick={togglePlaylist}>{playlistHidden ? "Show Playlist" : "Hide Playlist"}</button>
      <button onClick={handleMinimize}>{minimized ? "Maximize" : "Minimize"}</button>
      <button onClick={closePlayer}>Close</button>
    </div>
  );
}
