import React, { createContext, useContext, useEffect, useRef } from "react";

const MusicContext = createContext();

function MusicProvider(props) {
  const { songs, currentSongToPlay, setCurrentSongToPlay, setPlayerState } = props;

  // Shape of the object to be used to store the music data and methods
  const musicShape = {
    allSongsMap: null, // Map [[eId, Name]]
    allSongIdsArray: null, // Array [eId]
    playerState: null, // Number
    currName: null, // String
    currIdx: null, // Number
    currId: null, // String
    prevId: null, // String
    nextId: null, // String

    closePlayer() {
      setCurrentSongToPlay(null);
      window?.ytPlayer.destroy();
    },

    playThis(eId) {
      if (eId) {
        if (eId.includes("/yt/")) eId = eId.replace("/yt/", "");
        setCurrentSongToPlay(eId);
      }
    },

    handlePlayPause() {
      if (ytPlayerState === 1) window?.ytPlayer?.pauseVideo();
      else window?.ytPlayer?.playVideo();
    },
  };

  // Save the music object inside ref
  const music = useRef(musicShape);

  // When songs are fetched, extract and stored data into the music context
  useEffect(() => {
    if (!songs) return;
    music.current.allSongsMap = songs.reduce((acc, curr) => {
      return acc.set(curr?.eId.replace("/yt/", ""), curr?.name);
    }, new Map());
    music.current.allSongIdsArray = songs.map(song => song.eId.replace("/yt/", ""));
  }, [songs]);

  // When a song to play is chosen find eIds of current, next and previous songs and index of current song
  useEffect(() => {
    if (!songs) return;
    // Get indexes
    const currIdx = music.current.allSongIdsArray.indexOf(currentSongToPlay);
    const prevIdx = currIdx > 0 ? currIdx - 1 : -1;
    const nextIdx = currIdx < music.current.allSongIdsArray.length - 1 ? currIdx + 1 : 0;
    // Set IDs
    music.current.currId = currentSongToPlay;
    music.current.nextId = music.current.allSongIdsArray[nextIdx];
    music.current.prevId = music.current.allSongIdsArray[prevIdx];
    music.current.currName = music.current.allSongsMap.get(music.current.currId);
    // Play Song
    if (window.ytPlayer) window?.ytPlayer.destroy();
    playThisVideo(music.current.currId);

    return () => {
      setPlayerState(null);
      music.current.playerState = null;
      music.current.currName = null;
      music.current.currIdx = null;
      music.current.currId = null;
      music.current.prevId = null;
      music.current.nextId = null;
    };
  }, [currentSongToPlay]);

  // Change YouTube PlayerState on Player Events
  useEffect(() => {
    function handleYtPlayerEvents(ev) {
      music.current.playerState = ev.detail.data;
      setPlayerState(ev.detail.data);
    }
    document.addEventListener("ytPlayerStateChangeEvent", handleYtPlayerEvents);
    return () => {
      document.removeEventListener("ytPlayerStateChangeEvent", handleYtPlayerEvents);
    };
  });
  return <MusicContext.Provider value={music.current} {...props} />;
}

//Custom hook
function useMusic() {
  return useContext(MusicContext);
}

export { useMusic, MusicProvider };
