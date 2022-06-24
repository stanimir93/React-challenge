import { createContext } from "react";

const MusicContext = createContext();

// Shape of context object
const musicShape = {
  allSongsMap: null, // Map  -> [[eId, Name]]
  allSongIdsArray: null, // Array -> [eId, eId]
  playerState: null, // Number
  currName: null, // String
  currIdx: null, // Number
  currId: null, // String
  prevId: null, // String
  nextId: null, // String
};

export { MusicContext, musicShape };
