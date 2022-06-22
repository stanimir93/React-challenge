import "./cardimage.css";
import React from "react";
import CardPlayButton from "../CardPlayButton/CardPlayButton";

export default function CardImage(props) {
  const { setPlaying, img, eId } = props;
  return (
    <div className='card__image' style={{ backgroundImage: `url(${img}) ` }}>
      <CardPlayButton setPlaying={setPlaying} eId={eId} />
    </div>
  );
}
