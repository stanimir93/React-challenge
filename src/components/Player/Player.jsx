import "./player.css";
import React, { useEffect, useRef, useState } from "react";
import Playlist from "../Playlist/Playlist";

export default function Player(props) {
  const setPlaying = props.setPlaying;
  const songs = props.songs;
  const eIdPlaying = props.eId.replace("/yt/", "");
  const playerRef = useRef(null);
  const playlistRef = useRef(null);
  const playlist = useRef(null);
  const [minimized, setMinimized] = useState(false);

  // Prepare a playlist with all the songs
  if (songs && !playlist.current) {
    const songsMap = new Map();
    songs.forEach(elem => {
      songsMap.set(elem?.eId.replace("/yt/", ""), elem.name);
    });
    playlist.current = songsMap;
  }

  // Minimize Player
  function handleMinimize() {
    playerRef.current.classList.toggle("minimized");
    playerRef.current.classList.contains("minimized") ? setMinimized(true) : setMinimized(false);
  }

  // Show/Hide Playlist
  function togglePlaylist() {
    playlistRef.current.classList.toggle("hidden");
  }

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
        let songs = [...playlist.current.keys()];
        let currentIdx = songs.indexOf(eIdPlaying);
        let next = currentIdx < songs.length - 1 ? currentIdx + 1 : 0;
        setPlaying(songs[next]);
      }
    }
    // Subscribe/Unsubscribe songFinished to playerCallbacks onPlayerStateChange
    let cb = playerCallbacks.add(songFinished);
    return () => playerCallbacks.remove(cb);
  });

  return (
    <div className='player'>
      <Playlist setPlaying={setPlaying} playlistRef={playlistRef} playlist={playlist.current} eIdPlaying={eIdPlaying} />
      <div className='player__menu'>
        <span className='player__menu__song-name'>{playlist.current.get(eIdPlaying)}</span>
        <span className='player__menu__buttons'>
          <button onClick={togglePlaylist}>Playlist</button>
          <button onClick={handleMinimize}>{minimized ? "Maximize" : "Minimize"}</button>
          <button onClick={closePlayer}>Close</button>
        </span>
      </div>
      <div ref={playerRef} className='player__view-wrapper'>
        <div id='player-view'></div>
      </div>
    </div>
  );
}
