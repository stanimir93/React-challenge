import "./player.css";
import React, { useEffect } from "react";

export default function App(props) {
  const { eId, myPlayer } = props;
  useEffect(() => {
    if (playerReady) playThisVideo(eId);
    return () => {
      window.player.destroy();
    };
  }, [eId]);
  return (
    <div className='player'>
      <div>
        <button onClick={() => myPlayer(null)}>Close</button>
      </div>
      <div id='player'></div>
    </div>
  );
}
