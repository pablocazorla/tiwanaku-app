import { useContext, useEffect } from "react";
import AppContext from "@/context";
import Logo from "@/components/logo";
import I18n from "@/i18n";
import Button from "@/components/button";
import setFullScreen from "@/utils/fullscreen";

const Loader = ({ gameToLoad, setShowLoader }) => {
  const { loadGame, setView } = useContext(AppContext);

  useEffect(() => {
    window.history.replaceState({}, document.title, window.location.pathname);
  }, []);

  return (
    <section className="section-home">
      <Logo />
      <p className="text-center py-5 mb-4 w-2/3 mx-auto">
        <I18n id="loader.p1" />
      </p>
      <nav className=" flex flex-col items-center gap-6 w-2/3 mx-auto">
        <Button
          onClick={() => {
            setFullScreen();
            loadGame(gameToLoad);
            setView("game");
          }}
          className="w-full"
        >
          <I18n id="btn.loadGame" />
        </Button>
        <Button
          variant="secondary-outline"
          onClick={() => {
            setFullScreen();
            setShowLoader(false);
          }}
          className="w-2/3"
        >
          <I18n id="btn.cancel" />
        </Button>
      </nav>
    </section>
  );
};

export default Loader;
