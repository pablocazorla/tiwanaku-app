const GAME_KEY = "tiwanaku-game";
const OPTIONS_KEY = "tiwanaku-options";

const storage = {
  getGame: () => {
    const game = localStorage.getItem(GAME_KEY);
    return game ? JSON.parse(game) : null;
  },
  setGame: (game) => {
    localStorage.setItem(GAME_KEY, JSON.stringify(game));
  },
  clearGame: () => {
    localStorage.removeItem(GAME_KEY);
  },
  getOptions: () => {
    const options = localStorage.getItem(OPTIONS_KEY);
    return options ? JSON.parse(options) : null;
  },
  setOptions: (options) => {
    localStorage.setItem(OPTIONS_KEY, JSON.stringify(options));
  },
};

export default storage;
