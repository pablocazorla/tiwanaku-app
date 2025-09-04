import { FIELD_IDS, MAX_CELLS_BY_COLOR } from "@/config/constants";

class GridGenerator {
  constructor({ rows, cols, max_cells_revealed }) {
    this.ROWS = rows;
    this.COLS = cols;
    this.MAX_CELLS_REVEALED = max_cells_revealed;
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

    // Intentar asignar números a las celdas
    return this.assignNumbers(cells, numbers, 0, color);
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

    return await this.backtrack(allShapes, 0);
  }

  async backtrack(allShapes, cellsPlaced) {
    if (cellsPlaced === this.TOTAL_CELLS) return true;

    let freeRow = -1,
      freeCol = -1;
    outer: for (let r = 0; r < this.ROWS; r++) {
      for (let c = 0; c < this.COLS; c++) {
        if (this.grid[r][c] === null) {
          freeRow = r;
          freeCol = c;
          break outer;
        }
      }
    }

    if (freeRow === -1) return cellsPlaced === this.TOTAL_CELLS;

    for (const shape of allShapes) {
      for (const placement of this.getShapePlacements(shape)) {
        if (!placement.some(([r, c]) => r === freeRow && c === freeCol))
          continue;
        if (!this.areCellsFree(placement)) continue;

        for (const color of this.COLORS) {
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

  async generate() {
    // ("Generando grilla...");

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
        return { success: false, grid: null, sectors: null };
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

      while (d < this.MAX_CELLS_REVEALED) {
        const row = Math.floor(Math.random() * this.ROWS);
        const col = Math.floor(Math.random() * this.COLS);

        grid[row][col].visibleField = true;
        grid[row][col].visibleFruit = true;
        d++;
      }

      return {
        success: true,
        grid,
        counts: this.COLORS.map((color) => {
          return {
            color,
            count: counts[color],
          };
        }),
      };
    } else {
      // ("No se pudo encontrar una solución");
      return { success: false, grid: null, sectors: null };
    }
  }
}

export default GridGenerator;
