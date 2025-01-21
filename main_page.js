const rows = 25; 
const cols = 40;
const gridContainer = document.getElementById('grid');
let map = Array(rows).fill().map(() => Array(cols).fill(0));
let isMouseDown = false;
let isRightClick = false; 

let startRow = 1;
let startCol = 1;
let endRow = 23;
let endCol = 38;
map[startRow][startCol] = 2;
map[endRow][endCol] = 3;

gridContainer.addEventListener('contextmenu', (e) => e.preventDefault());

gridContainer.addEventListener('mousedown', (e) => {
  isMouseDown = true;
  isRightClick = e.button === 2; 

  const cell = e.target;
  if (cell.classList.contains('cell')) {
    const row = parseInt(cell.dataset.row, 10);
    const col = parseInt(cell.dataset.col, 10);

    if (cell.classList.contains('start') || cell.classList.contains('end')) {
      return;
    }

    if (isRightClick) {
      // Remove wall
      cell.classList.remove('wall');
      map[row][col] = 0; 
    } else {
      // Add wall
      cell.classList.add('wall');
      map[row][col] = 1; 
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
      if (isMouseDown) {
        if (cell.classList.contains('start') || cell.classList.contains('end')) {
          return; // Prevent modifying the starting cell
        }

        if (isRightClick) {
          // Remove wall
          cell.classList.remove('wall');
          map[row][col] = 0; 
        } else {
          // Add wall
          cell.classList.add('wall');
          map[row][col] = 1; 
        }
      }
    });
  }
}

