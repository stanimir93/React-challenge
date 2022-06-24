import "./song.css";
import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import PlayButton from "../../components/PlayButton/PlayButton";

export default function Song(props) {
  const { songs } = props;
  const [searchParams] = useSearchParams();
  const eId = searchParams.get("id");
  const song = songs?.find(song => (song?.eId.replace("/yt/", "") === eId ? song.name : ""));
  const navigate = useNavigate();

  function decodeHtmlCharCode(str) {
    return str?.replace(/(&#(\d+);)/g, (match, capture, charCode) => String.fromCharCode(charCode));
  }

  return (
    <div className='song-page'>
      <div className='song-page__back-button-container'>
        <button className='song-page__back-button' onClick={() => navigate(-1)}>
          <FaLongArrowAltLeft />
        </button>
      </div>
      {song ? (
        <div className='song-page__content-container'>
          <div className='song-page__img' style={{ backgroundImage: `url(${song.img}) ` }}>
            <span className='song-page__play-btn-container'>
              <PlayButton eId={eId} />
            </span>
          </div>
          <h1 className='song-page__heading'>{decodeHtmlCharCode(song?.src?.name && song?.name)}</h1>
          <p className='song-page__description'>{song?.text || "No description provided for this song!"}</p>
          <a className='song-page__link' href={song?.src?.id} target='_blank' title='Open Song in Youtube'>
            Open on YouTube
          </a>
        </div>
      ) : (
        <p className='song__loading'>LOADING</p>
      )}
    </div>
  );
}
