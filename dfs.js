import { map, startRow, startCol, endRow, endCol, rows, cols } from './main_bert.js';   

export function dfs() {
    /*console.log(startRow);*/
    let visited = Array(rows).fill().map(() => Array(cols).fill(false));
    let path = []
    return dfsrecursive(startRow, startCol, visited, path);  
}

function dfsrecursive(row, col, visited, path) {
    visited[row][col] = true;
    path.push([row, col]);

    if(map[row][col] === 'E') return path;
    const directions = [
        [1, 0],  // Down
        [0, 1],  // Right
        [0, -1], // Up
        [-1, 0]  // Left
    ];

    for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;

        // Check if the neighbor is within bounds, walkable, and not yet visited
        if (
            newRow >= 0 && newRow < rows &&
            newCol >= 0 && newCol < cols &&
            map[newRow][newCol] !== 0 && // Not a wall
            !visited[newRow][newCol]
        ) {
            const result = dfsrecursive(newRow, newCol, visited, path);
            if (result) return result; // Stop recursion if goal is found
        }
    }

    // Backtrack: Remove the current cell from the path
    path.pop();
    return null;
}