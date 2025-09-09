import { DEFAULT_LANG } from "@/i18n";

export const ROWS_COUNT = 5;

export const MAP_TYPES = [
  {
    sizeName: "5 x 5",
    rows: ROWS_COUNT,
    cols: 5,
    max_cells_revealed: 4,
    otomasCount: 0,
  },
  {
    sizeName: "5 x 9",
    rows: ROWS_COUNT,
    cols: 9,
    max_cells_revealed: 7,
    otomasCount: 5,
  },
];

export const FIELD_IDS = ["sand", "dirt", "grass", "rock"];

export const MAX_CELLS_BY_COLOR = 15;

export const COLOR = {
  fruit: {
    1: "#785648",
    2: "#37774f",
    3: "#c5373e",
    4: "#d99817",
    5: "#a0498c",
  },
  field: {
    sand: "#fdf0b8",
    dirt: "#c69a80",
    grass: "#d3e297",
    rock: "#bbcddb",
  },
};

export const DEFAULT_OPTIONS = {
  lang: DEFAULT_LANG,
};

export const DEFAULT_EMPTY_GAME = {
  sizeName: null,
  rows: 0,
  cols: 0,
  max_cells_revealed: 0,
  otomasCount: 0,
  grid: [],
  counts: [],
  otomas: {},
};

export const MAX_STEPS_ALGORITHM = 5000;
export const MAX_STEPS_RETRY = 3;
