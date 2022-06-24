import "./playbutton.css";
import React, { useContext } from "react";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { MusicContext } from "../../contexts/MusicContext";

export default function PlayButton(props) {
  let { eId } = props;
  eId = eId.replace("/yt/", "");
  const music = useContext(MusicContext);
  const { playThis, playerState, currId, handlePlayPause } = music;

  function handlePlayBtn() {
    if (currId && currId === eId) handlePlayPause();
    else playThis(eId);
  }

  return (
    <button className='play-button' onClick={handlePlayBtn}>
      {playerState === 1 && currId === eId ? <FaPauseCircle /> : <FaPlayCircle />}
    </button>
  );
}
