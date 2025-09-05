import { useContext } from "react";
import AppContext from "@/context";
import { MAP_TYPES } from "@/config/constants";
import { cx } from "@/utils/cx";
import Button from "../../../components/button";
import I18n from "../../../i18n";

const mapTypes = [
  MAP_TYPES[0],
  {
    sizeName: "separator",
  },
  MAP_TYPES[1],
];

const Step1 = ({ setStep }) => {
  const { game, setGameSize, resetGame, setView } = useContext(AppContext);

  return (
    <div className="fade-in">
      <h1 className="text-center font-bold text-2xl mb-6 border-b border-amber-800 border-dotted pb-3">
        <I18n id="createNewGame.title" />
      </h1>
      <h2 className="text-center mb-7">
        <I18n id="createNewGame.select-mapsize" />
      </h2>
      <div className="flex gap-8 justify-center">
        {mapTypes.map(({ sizeName, rows, cols, max_cells_revealed }) => {
          if (sizeName === "separator") {
            return (
              <div
                key={sizeName}
                className="border-amber-600 border-l-2 rotate-12"
              ></div>
            );
          }
          const cells = Array.from({ length: rows * cols }, (_, i) => i);
          return (
            <div
              key={sizeName}
              className={cx(
                "border-2 border-transparent rounded-lg opacity-40 cursor-pointer transition-all",
                {
                  "border-amber-500 opacity-100": sizeName === game.sizeName,
                }
              )}
              onClick={() => {
                setGameSize(sizeName, rows, cols, max_cells_revealed);
              }}
            >
              <div
                className="grid gap-1 p-3"
                style={{
                  gridTemplateColumns: `repeat(${cols}, 1fr)`,
                }}
              >
                {cells.map((cell) => {
                  return (
                    <div
                      key={cell}
                      className="bg-amber-700 text-white text-center w-4 aspect-square"
                    ></div>
                  );
                })}
              </div>
              <div className="text-center text-amber-400 pb-3 text-xl leading-none font-medium">
                {sizeName}
              </div>
            </div>
          );
        })}
      </div>
      <nav className=" flex flex-col gap-6 w-2/3 mx-auto pt-12">
        <Button disabled={!game.sizeName} onClick={() => setStep(2)}>
          <I18n id="btn.createMap" />
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

export default Step1;
