import "./home.css";
import React from "react";
import Card from "../../components/Card/Card";

export default function Home(props) {
  const { songs, setPlaying } = props;
  return (
    <>
      <h1>My Songs</h1>
      <div className='songs'>
        {props?.songs?.map(song => {
          return (
            <Card
              key={song._id}
              songId={song._id}
              img={song.img}
              name={song.name}
              text={song.text}
              url={song?.src?.id}
              setPlaying={setPlaying}
              eId={song.eId}
            />
          );
        })}
      </div>
    </>
  );
}
