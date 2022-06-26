import "./playlist.css";
import React from "react";
import { useMusic } from "../../contexts/MusicContext";
import { uid } from "uid";

export default function Playlist(props) {
  const { playlistRef } = props;
  const music = useMusic();
  const { allSongsMap, currId, playThis } = music;

  function changeSong(ev) {
    if (ev.target.dataset.eid) playThis(ev.target.dataset.eid);
  }

  return (
    <ul className='playlist hidden' ref={playlistRef} onClick={changeSong}>
      {[...allSongsMap.entries()].map(song => {
        let name = song[1];
        let eId = song[0];
        let cls = eId === currId ? "playlist__current-song" : "";
        return (
          <li key={uid()} data-eid={eId} className={cls}>
            {name}
          </li>
        );
      })}
    </ul>
  );
}
