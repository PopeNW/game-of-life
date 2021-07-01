class GameOfLife {
  constructor() {
    this.gridWidth = 1280; // Grid width
    this.gridHeight = 720; // Grid height
    this.gridCell = 10; // Grid cell height and width
    this.rows = this.gridWidth / this.gridCell; // Calculates how many cells fit into the grid width
    this.cols = this.gridHeight / this.gridCell; // Calculates how many cells fit into the grid height
    this.grid = []; // Fills grid array with rows, columns, and empty cells
    this.initialiseGrid();
  }

  // Initialises grid arrays with dead cells
  initialiseGrid() {
    let grid = [];
    // Initialise rows and columns with dead cells
    for (let row = 0; row < this.rows; row++) {
      // Loop through grid rows
      grid[row] = []; // Initialise column array to be iterated through
      for (let col = 0; col < this.cols; col++) {
        // Loop through grid columns
        grid[row][col] = 0; // Sets initial cell state to 0 / dead
      }
    }
    this.grid = grid;
    this.render(); // Render grid canvas
  }

  // Seed grid with random cell states
  seedGrid() {
    let grid = this.grid;
    // Randomise cell states and return updated grid
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        grid[row][col] = Math.random() > 0.5 ? 1 : 0; // 50% chance for cell to be true or false
      }
    }
    this.grid = grid;
    this.render(); // Render grid canvas
  }

  // Determines cell states for next life cycle
  updateLifeCycle() {
    const newGrid = this.grid.map((arr) => [...arr]); // Duplicate grid array
    // Select a cell and count its neighbours
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[row].length; col++) {
        let neighbourCount = 0; // Tally of neighbouring cells

        // Loop through cell neighbours
        for (let i = -1; i <= 1; i++) {
          // Cell row
          for (let j = -1; j <= 1; j++) {
            // Cell column
            // Prevent cell counting itself as a neighbour
            if (i === 0 && j === 0) {
              continue;
            }
            // Check that cell neighbour position does not exceed grid boundries
            if (
              row + i >= 0 &&
              col + j >= 0 &&
              row + i < this.rows &&
              col + j < this.cols
            ) {
              neighbourCount += this.grid[row + i][col + j]; // Updates neighbour count variable by 1
            }
          }
        }
        // Apply rules
        // If a live cell has less than 2 or more than 3 neighbours it dies
        if (
          (this.grid[row][col] === 1 && neighbourCount < 2) ||
          neighbourCount > 3
        ) {
          newGrid[row][col] = 0;
        }
        // If a live cell has 2 or 3 neighbours it continues to live
        else if (
          (this.grid[row][col] === 1 && neighbourCount === 2) ||
          neighbourCount === 3
        ) {
          newGrid[row][col] = 1;
        }
        // If a dead cell has 3 neighbours then it lives
        else if (this.grid[row][col] === 0 && neighbourCount === 3) {
          newGrid[row][col] = 1;
        }
      }
    }
    this.grid = newGrid;
    this.render(); // Render grid canvas
  }

  //   Renders canvas and cells
  render() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = this.gridWidth; // Set grid canvas width
    canvas.height = this.gridHeight; // Set grid canvas height

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        ctx.beginPath();
        ctx.rect(
          row * this.gridCell,
          col * this.gridCell,
          this.gridCell,
          this.gridCell
        );
        ctx.fillStyle = this.grid[row][col] ? "green" : "white";
        ctx.fill();
        ctx.stroke();
      }
    }
  }
}

window.onload = () => {
  const game = new GameOfLife();
  const startStopBtn = document.getElementById("start-stop-btn");
  const nextIterationBtn = document.getElementById("next-iteration-btn");
  const seedBtn = document.getElementById("seed-btn");
  const resetBtn = document.getElementById("reset-btn");

  // window.setInterval(() => {
  //   game.updateLifeCycle();
  // }, 100);

  startStopBtn.addEventListener(
    "click",
    function () {
      game.updateLifeCycle();
    },
    false
  );

  // Button Event Listeners
  nextIterationBtn.addEventListener(
    "click",
    function () {
      game.updateLifeCycle();
    },
    false
  );

  // HTML seed grid button event listener. Calls the GameOfLife seedGrid function.
  seedBtn.addEventListener(
    "click",
    function () {
      game.seedGrid();
    },
    false
  );
  resetBtn.addEventListener(
    "click",
    function () {
      game.initialiseGrid();
    },
    false
  );
};
