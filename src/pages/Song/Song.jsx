import "./song.css";
import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function Song(props) {
  const songs = props.songs;
  const [searchParams] = useSearchParams();
  const songId = searchParams.get("id");
  const song = songs?.find(song => song._id === songId);

  const navigate = useNavigate();

  function decodeHtmlCharCode(str) {
    return str?.replace(/(&#(\d+);)/g, (match, capture, charCode) => String.fromCharCode(charCode));
  }

  return (
    <div>
      <div>
        <button onClick={() => navigate(-1)}>Back Button</button>
      </div>
      {song ? (
        <div>
          <img src={song?.img} alt={song?.name} />
          <h1>{decodeHtmlCharCode(song?.src?.name) || song.name}</h1>
          <p>{song.text || "song has no description"}</p>
          <a href={song?.src?.id} target='_blank' title='Open Song in Youtube'>
            Open in YouTube
          </a>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}
