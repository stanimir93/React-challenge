import "./song.css";
import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft, FaPlayCircle } from "react-icons/fa";

export default function Song(props) {
  const songs = props.songs;
  const setPlaying = props.setPlaying;
  const [searchParams] = useSearchParams();
  const songId = searchParams.get("id");
  const song = songs?.find(song => song._id === songId);

  const navigate = useNavigate();

  function decodeHtmlCharCode(str) {
    return str?.replace(/(&#(\d+);)/g, (match, capture, charCode) => String.fromCharCode(charCode));
  }

  return (
    <div className='song'>
      <div className='song__back-button-container'>
        <button className='song__back-button' onClick={() => navigate(-1)}>
          <FaLongArrowAltLeft />
        </button>
      </div>
      {song ? (
        <div className='song__info'>
          <div className='song__info__img' style={{ backgroundImage: `url(${song.img}) ` }}>
            <button className='song__info__img__btn' onClick={() => setPlaying(song.eId)}>
              <FaPlayCircle />
            </button>
          </div>
          <h1 className='song__info__heading'>{decodeHtmlCharCode(song?.src?.name) || song.name}</h1>
          <p className='song__info__description'>{song.text || "song has no description"}</p>
          <a className='song__info__link' href={song?.src?.id} target='_blank' title='Open Song in Youtube'>
            Open on YouTube
          </a>
        </div>
      ) : (
        <p className='song__loading'>Loading</p>
      )}
    </div>
  );
}
