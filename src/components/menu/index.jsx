import { useState, useContext } from "react";
import AppContext from "@/context";
import { IconMenu } from "@/components/icons/menu";
import IconClose from "@/components/icons/close";
import I18n from "@/i18n";
import Button from "@/components/button";
import Dialog from "./dialog";
import Modal from "@/components/modal";
import { IconShare } from "@/components/icons/share";

const Menu = () => {
  const { setView, setShowAbout, setShowShareGame, setShowLang } =
    useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);

  const [isOpenNewGame, setIsOpenNewGame] = useState(false);

  return (
    <>
      <button
        className="fixed z-50 top-2 right-2 p-2 rounded-full text-white text-2xl cursor-pointer bg-white/10"
        onClick={() => setIsOpen((v) => !v)}
      >
        {isOpen ? <IconClose /> : <IconMenu />}
      </button>
      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)} maxWidth={400}>
        <nav className="flex flex-col gap-3 px-3 py-4">
          <Button
            onClick={() => setIsOpenNewGame(true)}
            className="shadow-[0_2px_10px_rgba(0,0,0,1)]"
          >
            <I18n id="btn.newGame" />
          </Button>
          <Button
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <I18n id="btn.continueGame" />
          </Button>
          <Button
            variant="share"
            onClick={() => {
              setIsOpen(false);
              setShowShareGame(true);
            }}
            className="flex items-center justify-center gap-2"
          >
            <IconShare />
            <I18n id="btn.shareGame" />
          </Button>
          <Button
            variant="secondary-outline"
            onClick={() => {
              setIsOpen(false);
              setShowAbout(true);
            }}
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
      </Dialog>
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
                setIsOpen(false);
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
                setIsOpen(false);
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

export default Menu;
