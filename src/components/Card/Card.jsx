import "./card.css";
import React from "react";
import CardButton from "../CardButton/CardButton";
import CardImage from "../CardImage/CardImage";

export default function Card(props) {
  const { img, text, url, name, songId, myPlayer, eId } = props;
  return (
    <div className='card'>
      <CardImage eId={eId} img={img} myPlayer={myPlayer} />
      <h4>{name}</h4>
      <p>{text || "No description provided for this song!"}</p>
      <CardButton songId={songId} />
    </div>
  );
}
