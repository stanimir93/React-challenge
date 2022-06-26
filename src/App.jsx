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
import { MusicProvider } from "./contexts/MusicContext";
import { CONFIG } from "./config/config";

export default function App() {
  const [songs, setSongs] = useState(); // Store the data from the API
  const [playerState, setPlayerState] = useState(); // setPlayerState is called when on the custom event ("ytPlayerStateChangeEvent")
  const [currentSongToPlay, setCurrentSongToPlay] = useState(); // this takes the song eId and opens the player

  // Fetch playlist from API (make sure CONFIG.useDummyData === false)
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

  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <section>
            <MusicProvider
              songs={songs}
              currentSongToPlay={currentSongToPlay}
              setCurrentSongToPlay={setCurrentSongToPlay}
              setPlayerState={setPlayerState}
            >
              <Routes>
                <Route path={"/"} element={<Home songs={songs} />} />
                <Route path={"song"} element={<Song songs={songs} />} />
                <Route path={"about"} element={<About />} />
                <Route path={"*"} element={<NotFound />} />
              </Routes>
              {currentSongToPlay && <Player />}
            </MusicProvider>
          </section>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}
