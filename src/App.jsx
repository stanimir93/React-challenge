import "./global.css";
import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Player from "./components/Player/Player";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Song from "./pages/Song/Song";
import NotFound from "./pages/NotFound/NotFound";
import { MusicContext, musicShape } from "./contexts/MusicContext";
import { CONFIG } from "./config/config";

export default function App() {
  const [songs, setSongs] = useState(); // songs stores the data fetched from the API
  const [playerState, setPlayerState] = useState(); // setPlayerState is given to the YouTube Player to inform us on state updates
  const [currentSongToPlay, setCurrentSongToPlay] = useState(); //take the song eId
  const music = useRef(musicShape); // The Music context will take this ref

  // Attach functions that control the player to the context object
  music.current.closePlayer = function () {
    setCurrentSongToPlay(null);
    window?.ytPlayer.destroy();
  };
  music.current.playThis = function (id) {
    if (id) {
      if (id.includes("/yt/")) id = id.replace("/yt/", "");
      setCurrentSongToPlay(id);
      music.current.currIdx = music.current.allSongIdsArray.indexOf(id);
    }
  };
  music.current.handlePlayPause = function () {
    if (ytPlayerState === 1) window?.ytPlayer?.pauseVideo();
    else window?.ytPlayer?.playVideo();
  };

  // Fetch playlist from API (make sure CONFIG.useDummyData === false in order to fetch from API)
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    let loading = true;

    const url = CONFIG.useDummyData ? "./dummyData.json" : "/api/adrien?format=json&limit=11";

    fetch(url, { signal })
      .then(resp => resp.json())
      .then(data => setSongs(data))

      .finally(() => {
        loading = false;
      });

    return () => {
      if (loading) {
        controller.abort();
      }
    };
  }, []);

  // Create Array and Map for the Fetched Songs (to be used in the player and playlist)
  useEffect(() => {
    if (!songs) return;
    // music.current.allSongsObj = songs;
    music.current.allSongsMap = songs.reduce((acc, curr) => {
      return acc.set(curr?.eId.replace("/yt/", ""), curr?.name);
    }, new Map());
    music.current.allSongIdsArray = songs.map(song => song.eId.replace("/yt/", ""));
  }, [songs]);

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

  // Set song data -> current, next, previous song eId and indexes (to be used in the player)
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

  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <section>
            <MusicContext.Provider value={music.current}>
              <Routes>
                <Route path={"/"} element={<Home songs={songs} />} />
                <Route path={"song"} element={<Song songs={songs} />} />
                <Route path={"about"} element={<About />} />
                <Route path={"*"} element={<NotFound />} />
              </Routes>
              {currentSongToPlay && <Player />}
            </MusicContext.Provider>
          </section>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}
