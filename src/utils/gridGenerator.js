import {
  FIELD_IDS,
  MAX_CELLS_BY_COLOR,
  MAX_STEPS_ALGORITHM,
  MAX_STEPS_RETRY,
} from "@/config/constants";

class GridGenerator {
  constructor({ rows, cols, max_cells_revealed, otomasCount }) {
    this.ROWS = rows;
    this.COLS = cols;
    this.MAX_CELLS_REVEALED = max_cells_revealed;
    this.OTOMAS_COUNT = otomasCount;
    this.TOTAL_CELLS = this.ROWS * this.COLS;
    this.COLORS = [...FIELD_IDS];
    this.MAX_SECTOR_SIZE = 5;
    this.ORTHOGONAL_DIRS = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
    this.ALL_DIRS = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    this.grid = Array(this.ROWS)
      .fill()
      .map(() => Array(this.COLS).fill(null));
    this.sectors = [];
    this.iteration = 0; // para controlar pausas asincrónicas
    this.stepsAlgorithm = 0;
    this.stepsRetry = 0;
  }

  // Baraja un arreglo (Fisher–Yates) y devuelve una nueva copia barajada
  shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  // Verifica si una posición está dentro de la grilla
  isValidPosition(row, col) {
    return row >= 0 && row < this.ROWS && col >= 0 && col < this.COLS;
  }

  // Obtiene las celdas adyacentes (ortogonal u ortogonal+diagonal)
  getAdjacentCells(row, col, includeDiagonal = false) {
    const dirs = includeDiagonal ? this.ALL_DIRS : this.ORTHOGONAL_DIRS;
    const adjacent = [];

    for (const [dr, dc] of dirs) {
      const newRow = row + dr;
      const newCol = col + dc;
      if (this.isValidPosition(newRow, newCol)) {
        adjacent.push([newRow, newCol]);
      }
    }
    return adjacent;
  }

  randomInt(min, maxIncl) {
    return Math.floor(Math.random() * (maxIncl - min + 1)) + min;
  }

  // Verifica si un sector puede tener un color específico
  canSectorHaveColor(sectorCells, color) {
    for (const [row, col] of sectorCells) {
      const adjacent = this.getAdjacentCells(row, col, true); // Incluye diagonal

      for (const [adjRow, adjCol] of adjacent) {
        const cell = this.grid[adjRow][adjCol];
        if (
          cell &&
          cell.color === color &&
          !sectorCells.some(([r, c]) => r === adjRow && c === adjCol)
        ) {
          return false;
        }
      }
    }
    return true;
  }

  // Verifica si un número puede colocarse en una posición
  canPlaceNumber(row, col, number) {
    const adjacent = this.getAdjacentCells(row, col, true); // Incluye diagonal

    for (const [adjRow, adjCol] of adjacent) {
      const cell = this.grid[adjRow][adjCol];
      if (cell && cell.number === number) {
        return false;
      }
    }
    return true;
  }

  // Genera todas las formas posibles de sectores de un tamaño dado
  generateSectorShapes(size) {
    const shapes = [];

    function generateShape(cells, remaining) {
      if (remaining === 0) {
        shapes.push([...cells]);
        return;
      }

      if (cells.length === 0) {
        cells.push([0, 0]);
        generateShape(cells, remaining - 1);
        cells.pop();
        return;
      }

      const adjacentCells = new Set();
      for (const [row, col] of cells) {
        for (const [dr, dc] of [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
        ]) {
          const newRow = row + dr;
          const newCol = col + dc;
          const key = `${newRow},${newCol}`;
          if (!cells.some(([r, c]) => r === newRow && c === newCol)) {
            adjacentCells.add(key);
          }
        }
      }

      for (const posKey of adjacentCells) {
        const [row, col] = posKey.split(",").map(Number);
        cells.push([row, col]);
        generateShape(cells, remaining - 1);
        cells.pop();
      }
    }

    generateShape([], size);
    return shapes;
  }

  // Normaliza una forma de sector (mueve a origen 0,0)
  normalizeShape(shape) {
    const minRow = Math.min(...shape.map(([r]) => r));
    const minCol = Math.min(...shape.map(([, c]) => c));

    return shape.map(([r, c]) => [r - minRow, c - minCol]).sort();
  }

  // Obtiene todas las posiciones donde se puede colocar una forma
  getShapePlacements(shape) {
    const placements = [];
    const maxRow = Math.max(...shape.map(([r]) => r));
    const maxCol = Math.max(...shape.map(([, c]) => c));

    for (let startRow = 0; startRow <= this.ROWS - 1 - maxRow; startRow++) {
      for (let startCol = 0; startCol <= this.COLS - 1 - maxCol; startCol++) {
        const placement = shape.map(([r, c]) => [startRow + r, startCol + c]);
        placements.push(placement);
      }
    }
    return placements;
  }

  // Verifica si las celdas están libres
  areCellsFree(cells) {
    return cells.every(([row, col]) => this.grid[row][col] === null);
  }

  // Coloca un sector en la grilla
  placeSector(cells, color) {
    const numbers = [];
    for (let i = 1; i <= cells.length; i++) {
      numbers.push(i);
    }

    const shuffledNumbers = this.shuffle(numbers);
    const shuffledCells = this.shuffle(cells);

    // Intentar asignar números a las celdas
    return this.assignNumbers(shuffledCells, shuffledNumbers, 0, color);
  }

  // Asigna números a las celdas del sector usando backtracking
  assignNumbers(cells, numbers, index, color) {
    if (index === cells.length) {
      return true;
    }

    const [row, col] = cells[index];

    for (let i = 0; i < numbers.length; i++) {
      const number = numbers[i];

      if (this.canPlaceNumber(row, col, number)) {
        this.grid[row][col] = { color, number, sector: this.sectors.length };

        // Remover número de la lista
        const remainingNumbers = [...numbers];
        remainingNumbers.splice(i, 1);

        if (this.assignNumbers(cells, remainingNumbers, index + 1, color)) {
          return true;
        }

        // Backtrack
        this.grid[row][col] = null;
      }
    }

    return false;
  }

  // Remueve un sector de la grilla
  removeSector(cells) {
    for (const [row, col] of cells) {
      this.grid[row][col] = null;
    }
  }

  async solve() {
    const allShapes = [];
    for (let size = 1; size <= this.MAX_SECTOR_SIZE; size++) {
      const shapes = this.generateSectorShapes(size);

      const uniqueShapes = [];
      const seen = new Set();

      for (const shape of shapes) {
        const normalized = this.normalizeShape(shape);
        const key = JSON.stringify(normalized);
        if (!seen.has(key)) {
          seen.add(key);
          uniqueShapes.push(normalized);
        }
      }
      allShapes.push(...uniqueShapes);
    }

    const randomizedShapes = this.shuffle(allShapes);

    // Preindexar: para cada celda, qué placements (lista de celdas) existen
    const placementsByCell = new Map();
    for (let r = 0; r < this.ROWS; r++) {
      for (let c = 0; c < this.COLS; c++) {
        placementsByCell.set(`${r},${c}`, []);
      }
    }

    for (const shape of randomizedShapes) {
      const placements = this.getShapePlacements(shape);
      for (const placement of placements) {
        for (const [r, c] of placement) {
          const key = `${r},${c}`;
          const list = placementsByCell.get(key);
          if (list) list.push(placement);
        }
      }
    }

    this._placementsByCell = placementsByCell;

    return await this.backtrack(randomizedShapes, 0);
  }

  async backtrack(allShapes, cellsPlaced) {
    this.stepsAlgorithm++;
    if (this.stepsAlgorithm >= MAX_STEPS_ALGORITHM) {
      return false;
    }
    if (cellsPlaced === this.TOTAL_CELLS) return true;

    // MRV: elegir la celda vacía con menos colocaciones viables actualmente
    let bestCell = null;
    let bestCount = Infinity;

    for (let r = 0; r < this.ROWS; r++) {
      for (let c = 0; c < this.COLS; c++) {
        if (this.grid[r][c] !== null) continue;
        const key = `${r},${c}`;
        const allPlacements = this._placementsByCell?.get(key) || [];
        // Filtrar placements: todas las celdas libres
        let count = 0;
        for (const placement of allPlacements) {
          let ok = true;
          for (const [pr, pc] of placement) {
            if (this.grid[pr][pc] !== null) {
              ok = false;
              break;
            }
          }
          if (ok) count++;
        }
        if (count < bestCount) {
          bestCount = count;
          bestCell = [r, c];
          if (bestCount === 0) break; // poda temprana
        }
      }
      if (bestCount === 0) break;
    }

    if (!bestCell) return cellsPlaced === this.TOTAL_CELLS;

    const [freeRow, freeCol] = bestCell;

    for (const shape of this.shuffle(allShapes)) {
      const placements = this.shuffle(this.getShapePlacements(shape));
      for (const placement of placements) {
        if (!placement.some(([r, c]) => r === freeRow && c === freeCol))
          continue;
        if (!this.areCellsFree(placement)) continue;

        for (const color of this.shuffle(this.COLORS)) {
          // Poda por límite máximo de color
          const futureCells = placement.length;
          const currentColorCount = this.sectors.reduce(
            (acc, s) => acc + (s.color === color ? s.size : 0),
            0
          );
          if (currentColorCount + futureCells > MAX_CELLS_BY_COLOR) {
            continue;
          }
          if (this.canSectorHaveColor(placement, color)) {
            if (this.placeSector(placement, color)) {
              this.sectors.push({
                cells: placement,
                color,
                size: placement.length,
              });

              // 🚀 asincronía: liberar el event loop cada N iteraciones
              this.iteration++;
              if (this.iteration % 100 === 0) {
                await new Promise((res) => setTimeout(res, 0));
              }

              if (
                await this.backtrack(allShapes, cellsPlaced + placement.length)
              ) {
                return true;
              }

              this.removeSector(placement);
              this.sectors.pop();
            }
          }
        }
      }
    }
    return false;
  }

  async tryToFindSolution() {
    this.stepsAlgorithm = 0;
    if (await this.solve()) {
      // (`Solución encontrada en ${endTime - startTime}ms`);

      const counts = this.COLORS.reduce((acc, color) => {
        acc[color] = 0;
        return acc;
      }, {});

      this.sectors.forEach(({ color, cells }) => {
        counts[color] += cells.length;
      });

      let failedByColor = false;

      this.COLORS.forEach((color) => {
        if (counts[color] > MAX_CELLS_BY_COLOR) {
          failedByColor = true;
        }
      });

      if (failedByColor) {
        // ("No se pudo encontrar una solución");
        return { success: false, grid: null, counts: [], otomas: {} };
      }

      const grid = this.grid.map((row) => {
        return row.map((cell) => {
          return {
            field: cell.color,
            fruit: cell.number,
            visibleField: false,
            visibleFruit: false,
          };
        });
      });

      let d = 0;

      const revealed = [];

      const cellsRevealed = this.randomInt(
        this.OTOMAS_COUNT || 2,
        this.MAX_CELLS_REVEALED
      );

      while (d < cellsRevealed) {
        const row = Math.floor(Math.random() * this.ROWS);
        const col = Math.floor(Math.random() * this.COLS);

        if (!grid[row][col].visibleField && !grid[row][col].visibleFruit) {
          grid[row][col].visibleField = true;
          grid[row][col].visibleFruit = true;
          revealed.push([col, row]);
          d++;
        }
      }

      const otomas = revealed.slice(0, this.OTOMAS_COUNT).reduce((acc, pos) => {
        const [col, row] = pos;
        acc[`${col}_${row}`] = true;

        return acc;
      }, {});

      return {
        success: true,
        grid,
        counts: this.COLORS.map((color) => {
          return {
            color,
            count: counts[color],
          };
        }),
        otomas,
      };
    } else {
      return { success: false, grid: null, counts: [], otomas: {} };
    }
  }

  async generate() {
    this.stepsRetry = 0;
    while (this.stepsRetry <= MAX_STEPS_RETRY) {
      const result = await this.tryToFindSolution();
      if (result.success) {
        return result;
      }
      this.stepsRetry++;
    }
    return { success: false, grid: null, counts: [], otomas: {} };
  }
}

export default GridGenerator;
