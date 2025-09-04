import { useContext, useMemo } from "react";
import AppContext from "@/context";
import { IconCircle } from "@/components/icons/circle";
import Map from "./map";
import FieldPull from "./fieldPull";

const marginPx = 17;

const maxCellSize = 50;

const Grid = ({ initial }) => {
  const { game } = useContext(AppContext);

  const [topCircles, leftCircles] = useMemo(() => {
    return [
      Array.from({ length: game.cols }, (_, i) => i),
      Array.from({ length: game.rows }, (_, i) => i),
    ];
  }, [game]);

  return (
    <div className="">
      <div
        className="grid mx-auto mb-2"
        style={{
          gridTemplateColumns: `${marginPx}px auto`,
          gridTemplateRows: `${marginPx}px auto`,
          maxWidth: `${maxCellSize * game.cols + marginPx}px`,
        }}
      >
        <div />
        <div
          className="grid gap-1"
          style={{
            gridTemplateColumns: `repeat(${game.cols}, 1fr)`,
          }}
        >
          {topCircles.map((h) => {
            return (
              <div
                key={h}
                className="text-center text-xs text-red-500"
                style={{
                  height: `${marginPx}px`,
                }}
              >
                <IconCircle className="mx-auto drop-shadow-md" />
              </div>
            );
          })}
        </div>
        <div
          className="grid gap-1"
          style={{
            gridTemplateRows: `repeat(${game.rows}, 1fr)`,
          }}
        >
          {leftCircles.map((c) => {
            return (
              <div
                key={c}
                className="text-center text-xs flex flex-col justify-center text-white"
                style={{
                  width: `${marginPx}px`,
                }}
              >
                <IconCircle className="drop-shadow-md" />
              </div>
            );
          })}
        </div>

        <Map initial={initial} />
      </div>
      <FieldPull initial={initial} />
    </div>
  );
};

export default Grid;
