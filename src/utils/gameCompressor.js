import {
  DEFAULT_EMPTY_GAME,
  ROWS_COUNT,
  MAP_TYPES,
  FIELD_IDS,
} from "../config/constants";

const GameCompressor = {
  compressGame: (game) => {
    const { grid } = game;

    const list = [];

    grid.forEach((row) => {
      row.forEach((cell) => {
        const { field, fruit, visibleField, visibleFruit } = cell;

        list.push(
          `${field[0]}${fruit}${visibleField ? 1 : 0}${visibleFruit ? 1 : 0}`
        );
      });
    });

    return list.join("-");
  },
  decompressGame: (compressedGame) => {
    let game = { ...DEFAULT_EMPTY_GAME };

    try {
      const list = compressedGame.split("-");

      const colsCount = list.length / ROWS_COUNT;

      game = {
        ...DEFAULT_EMPTY_GAME,
        ...MAP_TYPES.find(({ cols }) => cols === colsCount),
      };

      const grid = [];
      let rowIndex = 0;
      let colIndex = 0;

      const count = {};

      list.forEach((cell) => {
        if (!grid[rowIndex]) {
          grid[rowIndex] = [];
        }

        const [fd, fr, vField, vFruit] = cell.split("");

        const field = FIELD_IDS.find((id) => id[0] === fd);

        if (!count[field]) {
          count[field] = 0;
        }

        count[field]++;

        grid[rowIndex][colIndex] = {
          field,
          fruit: parseInt(fr, 10),
          visibleField: vField === "1",
          visibleFruit: vFruit === "1",
        };

        colIndex++;
        if (colIndex === game.cols) {
          rowIndex++;
          colIndex = 0;
        }
      });

      game.grid = grid;

      game.counts = Object.keys(count).map((color) => {
        return {
          color,
          count: count[color],
        };
      });
    } finally {
      //
    }

    return game;
  },
};

export default GameCompressor;
