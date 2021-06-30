class GameOfLife {
  constructor() {
    this.gridHeight = 500; // Grid height
    this.gridWidth = 500; // Grid width
    this.gridCell = 10; // Grid cell height and width
    this.rows = this.gridWidth / this.gridCell; // Calculates how many cells fit into the grid width
    this.cols = this.gridHeight / this.gridCell; // Calculates how many cells fit into the grid height
    this.nextIteration = [];
    this.currentIteration = [];
    this.initialiseGrid(); // Fills currentIteration and nextIteration arrays with rows, columns, and empty cells
    this.render(); // Render grid canvas
    this.seedGrid(); // Generates random grid seed
  }

  // Initialises grid arrays with dead cells
  initialiseGrid() {
    // Initialise rows and columns with dead cells
    for (let row = 0; row < this.rows; row++) {
      // Loop through grid rows
      this.nextIteration[row] = []; // Initialise column array to be iterated through
      for (let col = 0; col < this.cols; col++) {
        // Loop through grid columns
        this.nextIteration[row][col] = false; // Sets initial cell state to false / dead
      }
    }
    this.currentIteration = this.nextIteration; // Initialises currentIteration array
  }

  // Seed grid with random cell states
  seedGrid() {
    // Randomise cell states and return updated grid
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.nextIteration[row][col] = Math.random() < 0.5; // 50% chance for cell to be true or false
      }
    }
    this.updateLifeCycle(); // Updates current iteration array to next life cycle
  }

  // Updates the currentIteration array with next life cycle, re-renders the grid
  updateLifeCycle() {
    this.currentIteration = this.nextIteration; // Updates current life cycle to next life cycle
    this.render(); // Updated render of the grid and cells
  }

  //   Renders canvas and cells
  render() {
    const grid = this.currentIteration;
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = this.gridWidth; // Set grid canvas width
    canvas.height = this.gridHeight; // Set grid canvas height

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        ctx.beginPath();
        ctx.rect(
          row * this.gridCell,
          col * this.gridCell,
          this.gridCell,
          this.gridCell
        );
        ctx.fillStyle = grid[row][col] ? "green" : "white";
        ctx.fill();
        ctx.stroke();
      }
    }
    requestAnimationFrame(this.render); // Animates iteration changes to grid
  }
}

window.onload = () => {
  const game = new GameOfLife();
  const startPauseBtn = document.getElementById("start-pause-btn");
  const nextIterationBtn = document.getElementById("next-iteration-btn");
  const seedBtn = document.getElementById("seed-btn");
  const resetBtn = document.getElementById("reset-btn");

  // HTML seed grid button event listener
  // Calls the GameOfLife seedGrid function
  seedBtn.addEventListener(
    "click",
    function () {
      game.seedGrid();
    },
    false
  );
  //   resetBtn.addEventListener(
  //     "click",
  //     function () {
  //       game.initialiseGrid();
  //     },
  //     false
  //   );
};
