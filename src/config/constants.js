export const MAP_TYPES = [
  {
    name: "5 x 5",
    rows: 5,
    cols: 5,
    max_cells_revealed: 4,
  },
  {
    name: "5 x 9",
    rows: 5,
    cols: 9,
    max_cells_revealed: 7,
  },
];

export const FIELD_IDS = ["sand", "dirt", "grass", "rock"];

export const MAX_CELLS_BY_COLOR = 15;

export const MAX_CELLS_REVEALED = 7;

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
