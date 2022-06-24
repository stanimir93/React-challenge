import "./card.css";
import React from "react";
import CardButton from "../CardButton/CardButton";
import CardImage from "../CardImage/CardImage";

export default function Card(props) {
  const { title, img, text, eId } = props;
  return (
    <div className='card'>
      <CardImage img={img} eId={eId} />
      <h4>{title}</h4>
      <p className='card__description'>{text || "No description provided for this song!"}</p>
      <CardButton eId={eId} title={title} />
    </div>
  );
}
