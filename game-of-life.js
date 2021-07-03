/* 
The Game Of Life
This file contains JavaScript code for the BBC technical test.
@author Nathan Pope
*/
class GameOfLife {
  constructor() {
    this.gridWidth = 700; // Grid width
    this.gridHeight = 700; // Grid height
    this.gridCellSize = 14; // Grid cell height and width

    this.gridRows = this.gridWidth / this.gridCellSize; // Calculates how many cells fit into the grid width
    this.gridCols = this.gridHeight / this.gridCellSize; // Calculates how many cells fit into the grid height

    this.canvas = document.getElementById("canvas"); // HTML canvas reference
    this.canvas.width = this.gridWidth; // Set grid canvas width
    this.canvas.height = this.gridHeight; // Set grid canvas height

    this.grid = []; // Current life cycle grid
    this.loop = null; // Used for auto life cycle loop toggling

    this.initialiseGrid(); // Fills grid array with rows, columns, and empty cells
  }

  // Initialises grid arrays with dead cells (Used for initial grid set up and Reset button)
  initialiseGrid() {
    let newGrid = []; // Used to store new grid layout during intialisation

    // Initialise rows and columns with dead cells
    for (let row = 0; row < this.gridRows; row++) {
      newGrid[row] = []; // Initialise column array to be iterated through
      for (let col = 0; col < this.gridCols; col++) {
        newGrid[row][col] = 0; // Sets initial cell state to 0 / dead
      }
    }

    this.grid = newGrid; // Overwrites grid with the new initialised grid
    this.render(); // Render grid canvas changes
  }

  // Seed grid with random cell states (Called by Seed button)
  seedGrid() {
    let newGrid = this.grid.map((arr) => [...arr]); // Duplicate grid array

    // Randomise cell states and return updated grid
    for (let row = 0; row < this.gridRows; row++) {
      for (let col = 0; col < this.gridCols; col++) {
        newGrid[row][col] = Math.random() > 0.5 ? 1 : 0; // 50% chance for cell to be 1 (alvie) or 0 (dead)
      }
    }

    this.grid = newGrid; // Overwrites the current grid with the new seeded grid
    this.render(); // Render grid canvas changes
  }

  // Updates cell states for the next life cycle by counting neighbours and applying rules
  updateLifeCycle() {
    let newGrid = this.grid.map((arr) => [...arr]); // Duplicate grid array

    // Counts neighbours
    for (let row = 0; row < this.gridRows; row++) {
      for (let col = 0; col < this.gridCols; col++) {
        let neighbourCount = 0; // Tally of neighbouring cells
        // Loop through the current cells neighbours
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            // Prevent selected cell counting itself as a neighbour
            if (i === 0 && j === 0) {
              continue;
            }
            // Check that neighbouring cell position being checked is not beyond grid boundries
            if (
              row + i >= 0 &&
              col + j >= 0 &&
              row + i < this.gridRows &&
              col + j < this.gridCols
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
    this.render(); // Render grid canvas changes
  }

  // Toggles automatic life cycle iterations (Called by Start / Stop button)
  toggleAutoLifeCycle() {
    // Starts the loop if it isn't running
    if (this.loop === null) {
      // Iterates to the next life cycle every 100 milliseconds
      this.loop = window.setInterval(() => {
        this.updateLifeCycle();
      }, 100);
    }
    // Ends the loop if it is running
    else {
      clearInterval(this.loop); // Clears the looping interval
      this.loop = null; // Resets loop back to null
    }
  }

  // Toggles a grid cells state on mouse click
  toggleClickedCell(ev) {
    const rect = this.canvas.getBoundingClientRect(); // Gets canvas position in the browser viewport
    const x = ev.clientX - rect.left; // X coordinate of mouse click on canvas
    const y = ev.clientY - rect.top; // Y coordinate of mouse click on canvas
    const selectedRow = Math.floor(x / this.gridCellSize); // Get selected row. Divides X by cell size and rounds the result.
    const selectedColumn = Math.floor(y / this.gridCellSize); // Get selected column. Divides Y by cell size and rounds the result.

    // Loop through grid rows and columns to find selected cell
    for (let row = 0; row < this.gridRows; row++) {
      for (let col = 0; col < this.gridCols; col++) {
        // Checks if the loops have reached the selected cell position
        if (selectedRow === row && selectedColumn === col) {
          this.grid[row][col] = 1 - this.grid[row][col]; // Toggle selected cell value
          this.render(); // Call render to refresh canvas
        }
      }
    }
  }

  // Renders grid and cells on the HTML canvas (Called whenever there is a change to the grid)
  render() {
    const ctx = this.canvas.getContext("2d"); // Sets the canvas drawing context to 2d rendering
    for (let row = 0; row < this.gridRows; row++) {
      for (let col = 0; col < this.gridCols; col++) {
        ctx.beginPath(); // Begin drawing path
        // Draws the current grid cell
        ctx.rect(
          row * this.gridCellSize,
          col * this.gridCellSize,
          this.gridCellSize,
          this.gridCellSize
        );
        ctx.fillStyle = this.grid[row][col] ? "#8bac0f" : "#ffffff"; // Live cells are light green and dead cells are white
        ctx.fill(); // Fills the grid cell with colour
        ctx.stroke(); // Draws a border around the grid cell
        ctx.closePath(); // End drawing path
      }
    }
  }
}

// Waits until the web page has finished loading
window.onload = () => {
  const game = new GameOfLife(); // Initialises the game of life
  const startStopBtn = document.getElementById("start-stop-btn"); // Start / Stop button
  const nextIterationBtn = document.getElementById("next-iteration-btn"); // Next Iteration button
  const seedBtn = document.getElementById("seed-btn"); // Seed button
  const resetBtn = document.getElementById("reset-btn"); // Reset button

  // Event Listeners
  // Mouse click on canvas event listener. Toggles a selected grid cell to alive or dead.
  canvas.addEventListener("mousedown", function (e) {
    game.toggleClickedCell(e);
  });

  // Start and Stop button event listener. On click, toggles automatic life cycle updates.
  startStopBtn.addEventListener(
    "click",
    function () {
      game.toggleAutoLifeCycle();
    },
    false
  );

  // Next Iteration button event listener. On click, the life cycle updates to the next iteration once.
  nextIterationBtn.addEventListener(
    "click",
    function () {
      game.updateLifeCycle();
    },
    false
  );

  // Seed grid button event listener. On click, random cells are seeded into the grid.
  seedBtn.addEventListener(
    "click",
    function () {
      game.seedGrid();
    },
    false
  );

  // Reset button event listener. On click, the grid is reset to all dead cells.
  resetBtn.addEventListener(
    "click",
    function () {
      game.initialiseGrid();
    },
    false
  );
};
