import { map, startRow, startCol, endRow, endCol, rows, cols } from './main_bert.js';  

export function dijkstra() {

    let localMap = Array(rows).fill().map(() => Array(cols).fill(0));
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (map[i][j] === 0) {
                localMap[i][j] = 999;
            } else {
                localMap[i][j] = map[i][j];
            }
        }
    }
    localMap[startRow][startCol] = 0;
    localMap[endRow][endCol] = 1;

    let backtrack = Array(rows).fill().map(() => Array(cols).fill([1, 1]));
    let visited = Array(rows).fill().map(() => Array(cols).fill(false));
    let dist = Array(rows).fill().map(() => Array(cols).fill(999));
    let q = [];

    backtrack[startRow][startCol] = 0;
    /* 
    localMap => Weights
    visited => visited or not
    dist => distance from source node
    backtrack => path;
    */

    const directions = [
        [1, 0],  // Down
        [0, 1],  // Right
        [0, -1], // Up
        [-1, 0]  // Left
    ];

    dist[startRow][startCol] = 0;
    q.push([startRow, startCol]);

    while(q.length != 0) {
        const curr = q.shift();
        
        if (visited[curr[0]][curr[1]]) continue;
        
        visited[curr[0]][curr[1]] = true;

        for (const [dr, dc] of directions) {
            let newRow = curr[0] + dr;
            let newCol = curr[1] + dc;
            let newCurr = [newRow, newCol]; 
            // console.log(distance[newRow][newCol][0]);

            if (
                newRow >= 0 && newRow < rows &&
                newCol >= 0 && newCol < cols &&
                !visited[newRow][newCol] &&
                dist[curr[0]][curr[1]] + localMap[newRow][newCol] < dist[newRow][newCol]
            ) {
                // console.log('Inputted');
                dist[newRow][newCol] = dist[curr[0]][curr[1]] + localMap[newRow][newCol]; 
                backtrack[newRow][newCol] = [curr[0], curr[1]];
                //console.log(dist[newRow][newCol][0], dist[newRow][newCol][1]);
                q.push(newCurr);
            }
        }
    }
    
    let path = [];
    let reverse = [endRow, endCol];

    while (reverse != 0) {
        path.push(reverse);
        reverse = backtrack[reverse[0]][reverse[1]];
        //console.log(backtrack);
    }

    return path;
}
