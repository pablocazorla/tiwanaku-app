import { useContext } from "react";
import AppContext from "@/context";
import I18n from "@/i18n";
import Grid from "@/components/grid";
import Button from "@/components/button";

const Step3 = () => {
  const { setView, resetGame, storeGame } = useContext(AppContext);

  return (
    <div className="fade-in">
      <h1 className="text-center font-bold text-2xl mb-6 border-b border-amber-800 border-dotted pb-3">
        <I18n id="createNewGame.config" />
      </h1>
      <Grid initial />
      <nav className=" flex flex-col gap-6 w-2/3 mx-auto pt-12">
        <Button
          onClick={() => {
            storeGame();
            setView("game");
          }}
        >
          <I18n id="btn.startGame" />
        </Button>
        <Button
          variant="secondary-outline"
          size="sm"
          className="w-2/3 mx-auto"
          onClick={() => {
            resetGame();
            setView("start");
          }}
        >
          <I18n id="btn.cancel" />
        </Button>
      </nav>
    </div>
  );
};

export default Step3;
