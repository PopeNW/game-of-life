class GameOfLife {
  constructor() {
    this.gridHeight = 500; // Grid height
    this.gridWidth = 500; // Grid width
    this.gridCell = 10; // Grid cell height and width
    this.rows = this.gridWidth / this.gridCell; // Calculates how many cells fit into the grid width
    this.cols = this.gridHeight / this.gridCell; // Calculates how many cells fit into the grid height
    this.nextIteration = this.initialiseGrid();
    this.currentIteration = this.nextIteration;
    this.renderGrid(); // Render grid canvas
  }

  // Initialises array with columns and rows based on grid width, height and cell size
  initialiseGrid() {
    let grid = []; // Empty grid array to be filled

    // Initialise rows and columns with dead cells
    for (let row = 0; row < this.rows; row++) {
      grid[row] = []; // Initialise column array to be iterated through
      for (let col = 0; col < this.cols; col++) {
        grid[row][col] = false; // Sets initial cell state to false / dead
      }
    }

    return grid; // Returns the populated grid
  }

  //   Renders grid canvas
  renderGrid() {
    const grid = this.currentIteration;
    const gridCell = this.gridCell;
    const gridWidth = this.gridWidth;
    const gridHeight = this.gridHeight;
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = gridWidth; // Set grid canvas width
    canvas.height = gridHeight; // Set grid canvas height

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        ctx.beginPath();
        ctx.rect(row * gridCell, col * gridCell, gridCell, gridCell);
        ctx.stroke();
      }
    }
  }
}

window.onload = () => {
  const game = new GameOfLife();
  const startPauseBtn = document.getElementById("start-pause-btn");
  const nextIterationBtn = document.getElementById("next-iteration-btn");
  const seedBtn = document.getElementById("seed-btn");
  const resetBtn = document.getElementById("reset-btn");
};
