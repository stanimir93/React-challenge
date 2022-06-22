import "./card.css";
import React from "react";
import CardButton from "../CardButton/CardButton";
import CardImage from "../CardImage/CardImage";

export default function Card(props) {
  const { img, text, name, songId, setPlaying, eId } = props;
  return (
    <div className='card'>
      <CardImage eId={eId} img={img} setPlaying={setPlaying} />
      <h4>{name}</h4>
      <p>{text || "No description provided for this song!"}</p>
      <CardButton songId={songId} name={name} />
    </div>
  );
}
