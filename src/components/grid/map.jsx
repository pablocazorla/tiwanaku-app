import { useContext } from "react";
import AppContext from "@/context";
import sandImg from "@/assets/img/sand.webp";
import dirtImg from "@/assets/img/dirt.webp";
import grassImg from "@/assets/img/grass.webp";
import rockImg from "@/assets/img/rock.webp";
import { COLOR } from "@/config/constants";
import { cx } from "@/utils/cx";

const fieldImgs = {
  sand: sandImg,
  dirt: dirtImg,
  grass: grassImg,
  rock: rockImg,
};

const Map = ({ initial }) => {
  const { game, setCellSelected } = useContext(AppContext);

  const { grid, cols } = game;

  return (
    <div className="flex flex-col select-none">
      {grid.map((row, y) => {
        return (
          <div
            key={y}
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
            }}
          >
            {row.map((cell, x) => {
              const { field, fruit, visibleField, visibleFruit } = cell;

              return (
                <div
                  key={x}
                  className={cx("aspect-square relative", {
                    "cursor-default": initial,
                    "cursor-pointer": !initial,
                  })}
                  onClick={
                    initial
                      ? null
                      : () => {
                          setCellSelected({ ...cell, x, y });
                        }
                  }
                >
                  {visibleField ? (
                    <img
                      src={fieldImgs[field]}
                      alt={field}
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full p-0.5">
                      <div className="w-full h-full bg-white/15"></div>
                    </div>
                  )}

                  {visibleFruit ? (
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] aspect-square rounded-full bg-amber-800 grid place-items-center font-bold text-white"
                      style={{
                        backgroundColor: COLOR.fruit[fruit],
                      }}
                    >
                      {fruit}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Map;
