/* 
The Game Of Life
This file contains JavaScript code for the BBC technical test by Nathan Pope.
*/

class GameOfLife {
  constructor() {
    this.gridWidth = 700; // Grid width
    this.gridHeight = 700; // Grid height
    this.gridCell = 10; // Grid cell height and width
    this.rows = this.gridWidth / this.gridCell; // Calculates how many cells fit into the grid width
    this.cols = this.gridHeight / this.gridCell; // Calculates how many cells fit into the grid height
    this.grid = []; // Current life cycle grid
    this.initialiseGrid(); // Fills grid array with rows, columns, and empty cells
  }

  // Initialises grid arrays with dead cells (Also used for Reset button call)
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

  // Seed grid with random cell states (Called by Seed button)
  seedGrid() {
    let newGrid = this.grid.map((arr) => [...arr]); // Duplicate grid array
    // Randomise cell states and return updated grid
    for (let row = 0; row < newGrid.length; row++) {
      for (let col = 0; col < newGrid[row].length; col++) {
        newGrid[row][col] = Math.random() > 0.5 ? 1 : 0; // 50% chance for cell to be 1 (alvie) or 0 (dead)
      }
    }
    this.grid = newGrid; // Overwrites the existing grid with the newly seeded grid
    this.render(); // Render grid canvas
  }

  // Determines cell states for the next life cycle by counting neighbours and applying rules
  updateLifeCycle() {
    let newGrid = this.grid.map((arr) => [...arr]); // Duplicate grid array
    // Loops through grid cells and count neighbours
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[row].length; col++) {
        let neighbourCount = 0; // Tally of neighbouring cells
        // Loop through cell neighbours
        for (let i = -1; i <= 1; i++) {
          // Cell neighbour row
          for (let j = -1; j <= 1; j++) {
            // Cell neighbour column
            // Prevent selected cell counting itself as a neighbour
            if (i === 0 && j === 0) {
              continue;
            }
            // Check that neighbouring cell position does not exceed grid boundries
            if (
              row + i >= 0 &&
              col + j >= 0 &&
              row + i < this.rows &&
              col + j < this.cols
            ) {
              neighbourCount += this.grid[row + i][col + j]; // Adds the value of neighbouring cell to neighbour count
            } else {
              continue;
            }
          }
        }
        // Apply rules and update cell state for the new grid
        let selectedCell = this.grid[row][col]; // Holds value of the selected cell state from current grid
        // If a live cell has fewer than 2 neighbours it dies
        if (selectedCell === 1 && neighbourCount < 2) {
          newGrid[row][col] = 0; // Updates cell state to dead on the new grid
        }
        // If a live cell has more than 3 neighbours it dies
        else if (selectedCell === 1 && neighbourCount > 3) {
          newGrid[row][col] = 0; // Updates cell state to dead on the new grid
        }
        // If a live cell has exactly 2 neighbours it lives
        else if (selectedCell === 1 && neighbourCount == 2) {
          newGrid[row][col] = 1; // Updates cell state to alive on the new grid
        }
        // If a cell (alive or dead) has exactly 3 neighbours it lives
        else if (neighbourCount === 3) {
          newGrid[row][col] = 1; // Updates cell state to alive on the new grid
        }
      }
    }
    this.grid = newGrid; // Overwrites the current life cycle grid with the new life cycle grid
    this.render(); // Render grid canvas
  }

  //   Renders the grid and cells on the HTML canvas (Called whenever there is a change to the grid)
  render() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = this.gridWidth; // Set grid canvas width
    canvas.height = this.gridHeight; // Set grid canvas height

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        ctx.beginPath();
        // Draw grid cells
        ctx.rect(
          row * this.gridCell,
          col * this.gridCell,
          this.gridCell,
          this.gridCell
        );
        // Set the cell colour dependent on cell state
        ctx.fillStyle = this.grid[row][col] ? "green" : "white";
        ctx.fill();
        ctx.stroke();
      }
    }
  }
}

// Runs when the web page has finished loading
window.onload = () => {
  const game = new GameOfLife(); // Initialises a game of life
  const startStopBtn = document.getElementById("start-stop-btn"); // Start and Stop button
  const nextIterationBtn = document.getElementById("next-iteration-btn"); // Next Iteration button
  const seedBtn = document.getElementById("seed-btn"); // Seed button
  const resetBtn = document.getElementById("reset-btn"); // Reset button

  // window.setInterval(() => {
  //   game.updateLifeCycle();
  // }, 100);

  // Event Listeners
  // Start and Stop button event listener.
  startStopBtn.addEventListener(
    "click",
    function () {
      game.updateLifeCycle();
    },
    false
  );

  // Next Iteration button event listener. Calls the GameOfLife updateLifeCycle function on click.
  nextIterationBtn.addEventListener(
    "click",
    function () {
      game.updateLifeCycle();
    },
    false
  );

  // Seed grid button event listener. Calls the GameOfLife seedGrid function on click.
  seedBtn.addEventListener(
    "click",
    function () {
      game.seedGrid();
    },
    false
  );

  // Reset button event listener. Calls the GameOfLife initialiseGrid function on click.
  resetBtn.addEventListener(
    "click",
    function () {
      game.initialiseGrid();
    },
    false
  );
};
