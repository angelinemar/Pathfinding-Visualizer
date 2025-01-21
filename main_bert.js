import { dfs } from './dfs.js';
import { dijkstra } from './dijkstra.js';
import { aStar } from './a-star.js';

export const rows = 25; 
export const cols = 40;
const gridContainer = document.getElementById('grid');
export let map = Array(rows).fill().map(() => Array(cols).fill(1));
let isMouseDown = false;
let isRightClick = false; 
let running = false;
let path = [];

export let startRow = 1;
export let startCol = 1;
export let endRow = 23;
export let endCol = 38;
map[startRow][startCol] = 'S';
map[endRow][endCol] = 'E';

let algorithm = 'DFS';

gridContainer.addEventListener('contextmenu', (e) => e.preventDefault());

gridContainer.addEventListener('mousedown', (e) => {
  isMouseDown = true;
  isRightClick = e.button === 2; 

  const cell = e.target;
  if (cell.classList.contains('cell') && !running) {
    const row = parseInt(cell.dataset.row, 10);
    const col = parseInt(cell.dataset.col, 10);

    if (cell.classList.contains('start') || cell.classList.contains('end')) {
      return;
    }

    if (isRightClick) {
      // Remove wall
      cell.classList.remove('wall');
      map[row][col] = 1; 
    } else {
      // Add wall
      cell.classList.add('wall');
      map[row][col] = 0; 
    }
  }
});

grid.addEventListener('mouseup', () => {
  isMouseDown = false; 
  isRightClick = false;
  /*console.log(isMouseDown);*/
});

gridContainer.addEventListener('mouseleave', () => {
  isMouseDown = false; 
  isRightClick = false;
});

// Generate the grid dynamically
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.row = row; // Store row index
    cell.dataset.col = col; // Store column index

    if (row === startRow && col === startCol) {
      cell.classList.add('start');
    } else if (row === endRow && col === endCol) {
      cell.classList.add('end');
    }

    gridContainer.appendChild(cell);

    cell.addEventListener('mouseover', () => {
      if (isMouseDown && !running) {
        if (cell.classList.contains('start') || cell.classList.contains('end')) {
          return; // Prevent modifying the starting cell
        }

        if (isRightClick) {
          // Remove wall
          cell.classList.remove('wall');
          map[row][col] = 1; 
        } else {
          // Add wall
          cell.classList.add('wall');
          map[row][col] = 0; 
        }
      }
    });
  }
}

const dfsBttn = document.getElementById('dfsMod');
const dijkstraBttn = document.getElementById('dijkstraMod');
const aStarBttn = document.getElementById('aStarMod');
const startBttn = document.getElementById('programStart');

dfsBttn.addEventListener("click", () => {
  algorithm = "DFS";
});

dijkstraBttn.addEventListener("click", () => {
  algorithm = "Dijkstra";
});

aStarBttn.addEventListener("click", () => {
  algorithm = "A-Star";
});

startBttn.addEventListener("click", () => {
  if(!running) {
    console.log("Algorithm is starting...");

    // Call the function to run the algorithm
    document.getElementById("programStart").innerHTML = "Clear";
    running = true;
    runAlgorithm();
  } else {
    path.forEach(([row, col]) => {
      const cell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
      if (cell && !cell.classList.contains('start') && !cell.classList.contains('end')) {
        cell.classList.remove('path'); // Add 'path' class for visualization
      }
    });
    document.getElementById("programStart").innerHTML = "Start";
    running = false;
  }
});

function runAlgorithm() {
  console.log("Running the algorithm...");
  console.log(algorithm);

  if (algorithm === 'DFS') {
    path = dfs();
    visualize() 
  } else if (algorithm === 'Dijkstra') {
    path = dijkstra();
    visualize();
  } else if (algorithm === 'A-Star') {
    path = aStar();
    visualize();
  }
}

function visualize() {
  console.log(path);
  path.forEach(([row, col]) => {
    const cell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
    if (cell && !cell.classList.contains('start') && !cell.classList.contains('end')) {
      cell.classList.add('path'); // Add 'path' class for visualization
    }
  });
}