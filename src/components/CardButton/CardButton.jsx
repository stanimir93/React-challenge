import "./cardbutton.css";
import React from "react";
import { Link } from "react-router-dom";

export default function CardButton(props) {
  const eId = props.eId;

  return (
    <Link className='card__info-button' to={`song?id=${eId}`}>
      INFO
    </Link>
  );
}
