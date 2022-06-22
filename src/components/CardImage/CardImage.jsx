import "./cardimage.css";
import React from "react";

export default function CardImage(props) {
  const { myPlayer, img, eId } = props;
  return (
    <div className='card__image' style={{ backgroundImage: `url(${img}) ` }}>
      <button onClick={() => myPlayer(eId)}>Play</button>
    </div>
  );
}
