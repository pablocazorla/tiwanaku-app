import { createContext, useCallback, useEffect, useState } from "react";
import storage from "@/utils/storage";
import { DEFAULT_OPTIONS, DEFAULT_EMPTY_GAME } from "@/config/constants";
//
import logoImg from "@/assets/img/logo.webp";
//
import sandImg from "@/assets/img/sand.webp";
import dirtImg from "@/assets/img/dirt.webp";
import grassImg from "@/assets/img/grass.webp";
import rockImg from "@/assets/img/rock.webp";
import fieldImg from "@/assets/img/field.webp";
import sandMiniImg from "@/assets/img/sand-mini.webp";
import dirtMiniImg from "@/assets/img/dirt-mini.webp";
import grassMiniImg from "@/assets/img/grass-mini.webp";
import rockMiniImg from "@/assets/img/rock-mini.webp";
//
import fruitImg_1 from "@/assets/img/f-1.webp";
import fruitImg_2 from "@/assets/img/f-2.webp";
import fruitImg_3 from "@/assets/img/f-3.webp";
import fruitImg_4 from "@/assets/img/f-4.webp";
import fruitImg_5 from "@/assets/img/f-5.webp";
import fruitImg from "@/assets/img/fruit.webp";

const Images = {
  shared: {
    logo: logoImg,
  },
  fields: {
    sand: sandImg,
    dirt: dirtImg,
    grass: grassImg,
    rock: rockImg,
    default: fieldImg,
  },
  fieldsMini: {
    sand: sandMiniImg,
    dirt: dirtMiniImg,
    grass: grassMiniImg,
    rock: rockMiniImg,
  },
  fruits: {
    1: fruitImg_1,
    2: fruitImg_2,
    3: fruitImg_3,
    4: fruitImg_4,
    5: fruitImg_5,
    default: fruitImg,
  },
};

const AppContext = createContext({
  view: "start",
  setView: () => {},
  options: { ...DEFAULT_OPTIONS },
  setOptions: () => {},
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
  loadGame: () => {},
  //
  Images,
  //
  showAbout: false,
  setShowAbout: () => {},
  //
  showShareGame: false,
  setShowShareGame: () => {},
  //
  showLang: false,
  setShowLang: () => {},
});

export const AppContextProvider = ({ children }) => {
  const [view, setView] = useState("start");
  const [options, setOptionValues] = useState({ ...DEFAULT_OPTIONS });

  const [game, setGame] = useState({
    ...DEFAULT_EMPTY_GAME,
  });

  const [cellSelected, setCellSelected] = useState(null);

  const [showAbout, setShowAbout] = useState(false);
  const [showShareGame, setShowShareGame] = useState(false);
  const [showLang, setShowLang] = useState(false);

  const resetGame = useCallback(() => {
    setCellSelected(null);
    setGame({
      ...DEFAULT_EMPTY_GAME,
    });
    storage.clearGame();
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

  const loadGame = useCallback((gameLoaded) => {
    setGame(gameLoaded);
    storage.setGame(gameLoaded);
  }, []);

  /////////////////
  useEffect(() => {
    const gameStored = storage.getGame();
    if (gameStored) {
      setGame(gameStored);
    }

    const optionsStored = storage.getOptions();
    if (optionsStored) {
      setOptions(optionsStored);
    } else {
      setShowLang(true);
    }

    // Preload images
    Object.values(Images).forEach((collection) => {
      Object.values(collection).forEach((urls) => {
        const img = new Image();
        img.src = urls;
      });
    });
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
      const newGame = {
        ...prevGame,
        grid,
      };
      storage.setGame(newGame);
      return newGame;
    });
  }, []);

  const setOptions = useCallback((ops) => {
    setOptionValues((oldOptions) => {
      const newOptions = { ...oldOptions, ...ops };
      storage.setOptions(newOptions);
      return newOptions;
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        view,
        setView,
        options,
        setOptions,
        game,
        cellSelected,
        setCellSelected,
        resetGame,
        setGameSize,
        setGameGrid,
        storeGame,
        updateCell,
        loadGame,
        //
        Images,
        //
        showAbout,
        setShowAbout,
        //
        showShareGame,
        setShowShareGame,
        //
        showLang,
        setShowLang,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
