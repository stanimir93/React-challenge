import "./home.css";
import React from "react";
import Card from "../../components/Card/Card";
import { uid } from "uid";

export default function Home(props) {
  const { songs } = props;
  return (
    <>
      <h1 className='home__heading'>My Songs</h1>
      <div className='songs'>
        {props?.songs?.map(song => {
          return (
            <Card
              key={uid()}
              img={song?.img}
              title={song?.name}
              text={song.text}
              url={song?.src?.id}
              eId={song?.eId?.replace("/yt/", "")}
            />
          );
        })}
      </div>
    </>
  );
}
