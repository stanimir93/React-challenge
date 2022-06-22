import "./cardimage.css";
import React from "react";

export default function CardImage(props) {
  const { setPlaying, img, eId } = props;
  return (
    <div className='card__image' style={{ backgroundImage: `url(${img}) ` }}>
      <button onClick={() => setPlaying(eId)}>Play</button>
    </div>
  );
}
