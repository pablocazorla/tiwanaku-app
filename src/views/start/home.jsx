import { useState, useContext } from "react";
import AppContext from "@/context";
import Modal from "@/components/modal";
import Logo from "@/components/logo";
import I18n from "@/i18n";
import Button from "@/components/button";
import setFullScreen from "@/utils/fullscreen";

const Home = () => {
  const { game, setView, setShowAbout, setShowLang } = useContext(AppContext);

  const [isOpenNewGame, setIsOpenNewGame] = useState(false);

  return (
    <>
      <section className="section-home">
        <Logo />
        <p className="text-center py-5 px-3 max-w-[380px] mx-auto">
          <I18n id="start.p1" />
        </p>
        <hr className="border-amber-800 border-dotted w-1/2 mx-auto" />
        <nav className=" flex flex-col gap-6 w-2/3 mx-auto py-6">
          <Button
            onClick={() => {
              setFullScreen();
              if (game.sizeName) {
                setIsOpenNewGame(true);
              } else {
                setView("createNewGame");
              }
            }}
          >
            <I18n id="btn.newGame" />
          </Button>
          <Button
            disabled={!game.sizeName}
            onClick={() => {
              setFullScreen();
              setView("game");
            }}
          >
            <I18n id="btn.continueGame" />
          </Button>
        </nav>
        <hr className="border-amber-800 border-dotted w-1/2 mx-auto" />
        <nav className=" flex flex-col gap-8 w-1/3 mx-auto pt-5">
          <Button
            variant="secondary-outline"
            size="sm"
            onClick={() => setShowAbout(true)}
          >
            <I18n id="btn.about" />
          </Button>
          <Button
            variant="transparent"
            size="sm"
            onClick={() => setShowLang(true)}
          >
            <I18n id="btn.lang" />
          </Button>
        </nav>
      </section>
      <Modal
        isOpen={isOpenNewGame}
        onClose={() => setIsOpenNewGame(false)}
        maxWidth={400}
      >
        <div className="text-center">
          <p className="mb-4">
            <I18n id="newGame.ask" />
          </p>

          <nav className="flex flex-col gap-6 items-center">
            <Button
              onClick={() => {
                setIsOpenNewGame(false);
                setView("createNewGame");
              }}
              className="shadow-[0_2px_10px_rgba(0,0,0,1)]"
            >
              <I18n id="btn.newGame.ask" />
            </Button>

            <Button
              variant="secondary-outline"
              size="sm"
              onClick={() => {
                setIsOpenNewGame(false);
                setView("game");
              }}
            >
              <I18n id="btn.continueGame" />
            </Button>
          </nav>
        </div>
      </Modal>
    </>
  );
};

export default Home;
