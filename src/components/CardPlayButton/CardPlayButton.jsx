import "./cardplaybutton.css";
import React from "react";
import { FaPlayCircle } from "react-icons/fa";

export default function (props) {
  const eId = props.eId;
  const setPlaying = props.setPlaying;
  return (
    <button className='card__play__button' onClick={() => setPlaying(eId)}>
      <FaPlayCircle />
    </button>
  );
}
