import { useState, useEffect } from "react";
import Home from "./home";
import Loader from "./loader";
import GameCompressor from "@/utils/gameCompressor";

const StartView = () => {
  // const { game, setView, setShowAbout } = useContext(AppContext);

  const [ready, setReady] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const [gameToLoad, setGameToLoad] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const gameCompressed = params.get("game");

    if (gameCompressed) {
      const game = GameCompressor.decompressGame(gameCompressed);

      if (game.sizeName) {
        setGameToLoad(game);
        setShowLoader(true);
      }
    }
    setReady(true);
  }, []);

  if (!ready) {
    return null;
  }

  return showLoader ? (
    <Loader gameToLoad={gameToLoad} setShowLoader={setShowLoader} />
  ) : (
    <Home />
  );
};

export default StartView;
