import "./cardbutton.css";
import React from "react";
import { Link } from "react-router-dom";

export default function CardButton(props) {
  const songId = props.songId;

  return <Link to={`song?id=${songId}`}>Song Info</Link>;
}
