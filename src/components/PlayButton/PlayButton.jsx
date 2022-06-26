import "./playbutton.css";
import React from "react";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { useMusic } from "../../contexts/MusicContext";

export default function PlayButton(props) {
  let { eId } = props;
  eId = eId.replace("/yt/", "");
  const music = useMusic();
  const { playThis, playerState, currId, handlePlayPause } = music;

  function handlePlayBtn() {
    if (currId && currId === eId) handlePlayPause();
    else playThis(eId);
  }

  return (
    <button className='play-button' onClick={handlePlayBtn} title={playerState === 1 ? "Pause" : "Play"}>
      {playerState === 1 && currId === eId ? <FaPauseCircle /> : <FaPlayCircle />}
    </button>
  );
}
