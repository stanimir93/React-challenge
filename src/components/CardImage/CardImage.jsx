import "./cardimage.css";
import React from "react";
import PlayButton from "../PlayButton/PlayButton";

export default function CardImage(props) {
  const { img, eId } = props;
  return (
    <div className='card__image' style={{ backgroundImage: `url(${img}) ` }}>
      <PlayButton eId={eId} />
    </div>
  );
}
