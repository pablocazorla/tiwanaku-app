import { useEffect, useState, useContext, useMemo } from "react";
import AppContext from "@/context";
import I18n from "@/i18n";
import sandImg from "@/assets/img/sand.webp";
import dirtImg from "@/assets/img/dirt.webp";
import grassImg from "@/assets/img/grass.webp";
import rockImg from "@/assets/img/rock.webp";
import { COLOR } from "@/config/constants";

const fieldImgs = {
  sand: sandImg,
  dirt: dirtImg,
  grass: grassImg,
  rock: rockImg,
};

const FieldPull = ({ initial }) => {
  const { game } = useContext(AppContext);

  const restFields = useMemo(() => {
    const restFields = game.counts.reduce((acc, { color, count }) => {
      acc[color] = count;
      return acc;
    }, {});

    if (initial) {
      return restFields;
    }

    game.grid.forEach((row) => {
      row.forEach((cell) => {
        if (cell.visibleField) {
          restFields[cell.field]--;
        }
      });
    });

    return restFields;
  }, [initial, game]);

  return (
    <div className="border-b border-amber-800 border-dotted pb-4">
      {initial ? null : (
        <p className="text-center mb-2">
          <I18n id="createNewGame.fieldPull" />
        </p>
      )}
      <div className="flex items-center justify-center gap-5">
        {Object.entries(restFields).map(([color, count]) => {
          return (
            <div key={color} className="flex items-center text-white gap-1">
              <div className="w-8">
                <img
                  src={fieldImgs[color]}
                  alt={color}
                  className="w-full h-full"
                />
              </div>
              <div className="font-bold">{`x ${count}`}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FieldPull;
