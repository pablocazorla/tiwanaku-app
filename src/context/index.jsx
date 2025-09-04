import { createContext, useCallback, useEffect, useState } from "react";
import storage from "@/utils/storage";

const defaultEmptyGame = {
  sizeName: null,
  rows: 0,
  cols: 0,
  max_cells_revealed: 0,
  grid: [],
  counts: [],
};

const AppContext = createContext({
  view: "start",
  setView: () => {},
  lang: "es",
  game: {
    sizeName: null,
    rows: 0,
    cols: 0,
    grid: [],
    counts: [],
  },
  cellSelected: null,
  setCellSelected: () => {},
  resetGame: () => {},
  setGameSize: () => {},
  setGameGrid: () => {},
  storeGame: () => {},
  updateCell: () => {},
});

export const AppContextProvider = ({ children }) => {
  const [view, setView] = useState("start");
  const [lang, setLang] = useState("es");

  const [game, setGame] = useState({
    ...defaultEmptyGame,
  });

  const [cellSelected, setCellSelected] = useState(null);

  const resetGame = useCallback(() => {
    setCellSelected(null);
    setGame({
      ...defaultEmptyGame,
    });
  }, []);

  const setGameSize = useCallback(
    (sizeName, rows, cols, max_cells_revealed) => {
      setGame({
        sizeName,
        rows,
        cols,
        max_cells_revealed,
      });
    },
    []
  );

  const setGameGrid = useCallback((grid, counts) => {
    setGame((prevGame) => {
      return {
        ...prevGame,
        grid,
        counts,
      };
    });
  }, []);

  const storeGame = useCallback(() => {
    storage.setGame(game);
  }, [game]);

  /////////////////
  useEffect(() => {
    const gameStored = storage.getGame();
    if (gameStored) {
      setGame(gameStored);
    }
  }, []);

  const updateCell = useCallback((newCell) => {
    const { x, y } = newCell;
    delete newCell.x;
    delete newCell.y;

    setGame((prevGame) => {
      const grid = prevGame.grid.map((row, yGrid) => {
        return row.map((cell, xGrid) => {
          if (xGrid === x && yGrid === y) {
            return newCell;
          }
          return cell;
        });
      });
      return {
        ...prevGame,
        grid,
      };
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        view,
        setView,
        lang,
        game,
        cellSelected,
        setCellSelected,
        resetGame,
        setGameSize,
        setGameGrid,
        storeGame,
        updateCell,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
