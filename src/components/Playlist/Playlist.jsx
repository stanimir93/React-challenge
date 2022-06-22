import "./playlist.css";
import React from "react";

export default function Playlist(props) {
  const { playlist, eIdPlaying, playlistRef, setPlaying } = props;

  function changeSong(ev) {
    setPlaying(ev.target.dataset.eid);
  }
  return (
    <ul className='playlist hidden' ref={playlistRef} onClick={changeSong}>
      {[...playlist.entries()].map(song => {
        let name = song[1];
        let eId = song[0];
        let cls = eId === eIdPlaying ? "playlist__current-song" : "";
        return (
          <li key={eId} data-eid={eId} className={cls}>
            {name}
          </li>
        );
      })}
    </ul>
  );
}
