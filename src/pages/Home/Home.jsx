import "./home.css";
import React, { useContext } from "react";
import Card from "../../components/Card/Card";
import dummyData from "../../dummyData.json"; // To be replaced with your api response data

export default function Home(props) {
  const songs = props.songs;
  return (
    <>
      <h1>Space X Ships</h1>
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
            />
          );
        })}
      </div>
    </>
  );
}
