class PriorityQueue {
    constructor() {
        this.nodes = [];
    }

    enqueue(node) {
        this.nodes.push(node);
        this.nodes.sort((a, b) => a.cost - b.cost);
    }

    dequeue() {
        return this.nodes.shift();
    }

    isEmpty() {
        return this.nodes.length === 0;
    }
}


class Node {
    constructor(state, cost, action, parent) {
        this.state = state;
        this.cost = cost;
        this.action = action;
        this.parent = parent;
    }

    toString() {
        return this.state.flat().join(',');
    }
}


function findBlankSpace(state) {
    for (let i = 0; i < state.length; i++) {
        for (let j = 0; j < state[i].length; j++) {
            if (state[i][j] === 0) return [i, j];
        }
    }
    return null;
}


function expandNode(node) {
    let newNodes = [];
    const moves = [
        [1, 0], [-1, 0], [0, 1], [0, -1]
    ];

    const [row, col] = findBlankSpace(node.state);

    moves.forEach(([dx, dy]) => {
        const newRow = row + dx, newCol = col + dy;

        if (newRow >= 0 && newRow < 3 && newCol >= 0 && newCol < 3) {
            let newState = node.state.map(row => [...row]);
            [newState[row][col], newState[newRow][newCol]] = [newState[newRow][newCol], newState[row][col]];
            newNodes.push(new Node(newState, node.cost + 1, [dx, dy], node));
        }
    });

    return newNodes;
}

function uniformCostSearch(initialState, goalState) {
    let queue = new PriorityQueue();
    queue.enqueue(new Node(initialState, 0, null, null));
    let explored = new Set();

    while (!queue.isEmpty()) {
        let node = queue.dequeue();
        if (node.toString() === goalState.toString()) {
            return node; 
        }

        explored.add(node.toString());
        let neighbors = expandNode(node);

        for (let neighbor of neighbors) {
            if (!explored.has(neighbor.toString())) {
                queue.enqueue(neighbor);
            }
        }
    }

    return null; 
}

let initialState = [
    [1, 2, 3], 
    [4, 5, 6], 
    [7, 8, 0]
]; 
let goalState = [
    [1, 2, 3], 
    [4, 5, 6], 
    [7, 8, 0]
];

console.log(initialState.flat().join(""))
let result = uniformCostSearch(initialState, goalState);
if (result) {
    console.log("Solution found!");
    let node = result;
    while(node != null) {
        console.table(node.state);
        node = node.parent;
    }
} else {
    console.log("No solution found.");
}

