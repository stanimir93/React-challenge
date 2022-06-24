import "./player.css";
import React, { useContext, useRef, useState, useEffect } from "react";
import Playlist from "../Playlist/Playlist";
import PlayerMenu from "../PlayerMenu/PlayerMenu";
import { MusicContext } from "../../contexts/MusicContext";

export default function Player() {
  const [playerMinimized, setPlayerMinimized] = useState(false);
  const [playlistHidden, setPlaylistHidden] = useState(true);
  const playerRef = useRef(null);
  const playlistRef = useRef(null);
  const music = useContext(MusicContext);
  const { nextId, playerState, playThis } = music;

  // Play next song automatically
  if (playerState === 0) playThis(nextId);

  return (
    <div className='player'>
      <Playlist playlistRef={playlistRef} />
      <PlayerMenu
        playerRef={playerRef}
        playlistRef={playlistRef}
        playerMinimized={playerMinimized}
        setPlayerMinimized={setPlayerMinimized}
        setPlaylistHidden={setPlaylistHidden}
      />
      <div ref={playerRef} className='player__view-wrapper'>
        <div id='player-view'></div>
      </div>
    </div>
  );
}
