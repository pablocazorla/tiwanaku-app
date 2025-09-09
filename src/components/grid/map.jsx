import { useContext } from "react";
import AppContext from "@/context";
import { COLOR } from "@/config/constants";
import { cx } from "@/utils/cx";
import { IconMeeple } from "@/components/icons/meeple";

// const visibleField = true;
// const visibleFruit = true;

const Map = ({ initial }) => {
  const { game, setCellSelected, Images } = useContext(AppContext);

  const { grid, cols, otomas } = game;

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
              const {
                field,
                fruit, //
                visibleField,
                visibleFruit,
              } = cell;

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
                      src={Images.fieldsMini[field]}
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
                  {initial && otomas[`${x}_${y}`] ? (
                    <div className="absolute bottom-1 right-1">
                      <IconMeeple className="text-black w-5 h-5" />
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
