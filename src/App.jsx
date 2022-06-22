import React, { Component, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Player from "./components/Player/Player";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Song from "./pages/Song/Song";
import NotFound from "./pages/NotFound/NotFound";
import "./global.css";

export default function App() {
  const [songs, setSongs] = useState();
  const [myPlayer, setMyPlayer] = useState();
  console.log(myPlayer);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    let loading = true;

    fetch("/api/adrien?format=json&limit=11", { signal })
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
            <Routes>
              <Route path={"/"} element={<Home songs={songs} myPlayer={setMyPlayer} />} />
              <Route path={"song"} element={<Song songs={songs} />} />
              <Route path={"about"} element={<About />} />
              <Route path={"*"} element={<NotFound />} />
            </Routes>
          </section>
          {myPlayer && <Player eId={myPlayer} myPlayer={setMyPlayer} />}
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}
