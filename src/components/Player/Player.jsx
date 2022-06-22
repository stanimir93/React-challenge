import "./player.css";
import React, { useEffect, useRef, useState } from "react";
import Playlist from "../Playlist/Playlist";
import PlayerControls from "../PlayerControls/PlayerControls";

export default function Player(props) {
  const setPlaying = props.setPlaying;
  const songs = props.songs;
  const eIdPlaying = props.eId.replace("/yt/", "");
  const playerRef = useRef(null);
  const playlistRef = useRef(null);
  const playlist = useRef(null);
  const [minimized, setMinimized] = useState(false);
  const [playlistHidden, setPlaylistHidden] = useState(true);

  // Prepare a playlist with all the songs
  if (songs && !playlist.current) {
    const songsMap = new Map();
    songs.forEach(elem => {
      songsMap.set(elem?.eId.replace("/yt/", ""), elem.name);
    });
    playlist.current = songsMap;
  }
  let songsArray = [...playlist.current.keys()];
  let currentIdx = songsArray.indexOf(eIdPlaying);
  let prevIdx = currentIdx > 0 ? currentIdx - 1 : -1;
  let nextIdx = currentIdx < songsArray.length - 1 ? currentIdx + 1 : 0;

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

  // useEffect(() => {
  //   function hidePlaylist(ev) {
  //     if (!document.querySelector(".player").contains(ev.target)) {
  //       playlistRef.current.classList.add("hidden");
  //     }
  //   }
  //   document.addEventListener("click", hidePlaylist);
  //   return () => document.removeEventListener("click", hidePlaylist);
  // });

  // Close Player
  function closePlayer() {
    playlist.current = null; //clear playlist on closing the player
    setPlaying(null);
  }

  // Create or destroy yt player on mount/unmount
  useEffect(() => {
    if (playerReady) playThisVideo(eIdPlaying);
    return () => {
      window.player?.destroy();
    };
  }, [eIdPlaying]);

  // Play next song listener
  useEffect(() => {
    function songFinished(ev) {
      if (ev.data === 0) {
        setPlaying(songsArray.at(nextIdx));
      }
    }
    // Subscribe/Unsubscribe songFinished to playerCallbacks onPlayerStateChange
    let cb = playerCallbacks.add(songFinished);
    return () => playerCallbacks.remove(cb);
  });

  return (
    <div className='player'>
      <Playlist setPlaying={setPlaying} playlistRef={playlistRef} playlist={playlist.current} eIdPlaying={eIdPlaying} />
      {/* Controls */}
      <div className='player__menu'>
        <button onClick={togglePlaylist}>{playlistHidden ? "Show Playlist" : "Hide Playlist"}</button>
        <button onClick={handleMinimize}>{minimized ? "Maximize" : "Minimize"}</button>
        <button onClick={closePlayer}>Close</button>
      </div>
      {/* Player View */}
      <div ref={playerRef} className='player__view-wrapper'>
        <div id='player-view'></div>
      </div>
      {/* Player Controls */}
      {minimized && (
        <PlayerControls songs={songsArray} next={nextIdx} prev={prevIdx} song={playlist.current.get(eIdPlaying)} />
      )}{" "}
    </div>
  );
}
