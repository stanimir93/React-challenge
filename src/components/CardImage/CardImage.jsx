import "./cardimage.css";
import React from "react";

export default function CardImage(props) {
  return (
    <div className='card__image' style={{ backgroundImage: `url(${props.img}) ` }}>
      <button>Play</button>
    </div>
  );
}
