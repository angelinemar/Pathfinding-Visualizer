import { map, startRow, startCol, endRow, endCol, rows, cols } from './main_bert.js';  

export function aStar() {
    let open_list = [];
    let close_list = [];
    let heuristics = Array(rows).fill().map(() => Array(cols).fill(0));

    for (let i=0; i<rows; i++) {
        for (let j=0; j<cols; j++) {
            heuristics[i][j] = Math.abs(endRow-i) + Math.abs(endCol-j);
        }
    }

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

    
    open_list.push({ row: startRow, col: startCol, g: 0, f: heuristics[startRow][startCol] });

    const directions = [
        [1, 0],  // Down
        [0, 1],  // Right
        [0, -1], // Up
        [-1, 0]  // Left
    ];

    while(open_list.length != 0) {
        
        let select = 0;
        for(let i=0; i<open_list.length; i++) {
            if (open_list[i].f < open_list[select].f) {
                select = i;
            }
        }
        let currentNode = open_list.splice(select, 1)[0];
        close_list.push(currentNode);

        if (currentNode.row === endRow && currentNode.col === endCol) {
            // console.log("Path found!");
            return reconstructPath(currentNode);
        }
        
        for (const [dr, dc] of directions) {
            let newRow = currentNode.row + dr;
            let newCol = currentNode.col + dc;
            
            if (
                newRow < 0 || newRow >= rows ||
                newCol < 0 || newCol >= cols ||
                localMap[newRow][newCol] === 999
            ) {
                continue;
            }   

            let g = currentNode.g + localMap[newRow][newCol]; 
            let h = heuristics[newRow][newCol];
            let f = g + h;

            if (close_list.some(node => node.row === newRow && node.col === newCol)) {
                continue;
            }

            // Check if neighbor is already in the open list with a better g value
            let existingNode = open_list.find(node => node.row === newRow && node.col === newCol);
            if (existingNode && g >= existingNode.g) {
                continue;
            }

            open_list.push({
                row: newRow,
                col: newCol,
                g: g,
                f: f,
                parent: currentNode, 
            });

        }
    }

    //console.log("No path found!");
    return null;

    function reconstructPath(node) {
        let path = [];
        while (node) {
            path.push([node.row, node.col]);
            node = node.parent;
        }
        return path.reverse(); 
    }

}