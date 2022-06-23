import "./player.css";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Playlist from "../Playlist/Playlist";
import PlayerMenu from "../PlayerMenu/PlayerMenu";

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

  // Create or destroy yt player on mount/unmount
  useEffect(() => {
    if (window.ytPlayerReady) playThisVideo(eIdPlaying);
    return () => {
      window?.ytPlayer?.destroy();
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

  // useLayoutEffect(() => {
  //   playerRef.cont
  // });

  return (
    <div className='player'>
      <Playlist setPlaying={setPlaying} playlistRef={playlistRef} playlist={playlist.current} eIdPlaying={eIdPlaying} />
      {/* Player menu */}
      <PlayerMenu
        setMinimized={setMinimized}
        minimized={minimized}
        playlistHidden={playlistHidden}
        setPlaylistHidden={setPlaylistHidden}
        playerRef={playerRef}
        playlistRef={playlistRef}
        setPlaying={setPlaying}
        songsArray={songsArray}
        nextIdx={nextIdx}
        prevIdx={prevIdx}
        playlist={playlist}
        eIdPlaying={eIdPlaying}
      />
      {/* Player View */}
      <div ref={playerRef} className='player__view-wrapper'>
        <div id='player-view'></div>
      </div>
      {/* Player Controls */}
    </div>
  );
}
