import {MinHeap} from './Helper/minHeap'
import Heap from 'heap'
export function aStarSearch(grid, startNode, finishNode){

    if(!startNode || !finishNode || startNode === finishNode)
        return false

    let openList = []

    const visitedNodes = []
    
    //const openSet = new Set()
    const closedSet = new Set()

    startNode.fCost = 0
    startNode.gCost = 0
    startNode.hCost = manhattanDistance(startNode, finishNode)

    openList.push(startNode)
    //openSet.add(startNode)

    while(openList.length !== 0){

        
        //openList.heapify();
        //console.log(openList);
        let smallIndex = 0;

        for(let i=0; i<openList.length; i++){
            if( openList[i].fCost < openList[smallIndex].fCost){
                smallIndex = i;
            }
        }
        console.log(smallIndex);
        let currentNode = openList.splice(smallIndex, 1)[0];
        console.log(currentNode)
        closedSet.add(currentNode)

        visitedNodes.push(currentNode)

        if(currentNode === finishNode){

            return visitedNodes
        }

        const neighbours = getNeighbours(grid, currentNode)
        //console.log(neighbours)
        for(let i = 0, l = neighbours.length; i < l ; ++i){
            const neighbour = neighbours[i]
            
            //console.log("Parent = "+ currentNode.row+" "+currentNode.col)

            if(closedSet.has(neighbour))
                continue
            
            let ng = currentNode.gCost + 1;

            if(openList.includes(neighbour)){
                console.log("before "+neighbour.gCost+" new "+ng)
                if(ng < neighbour.gCost){
                    neighbour.gCost = ng
                    neighbour.hCost = hurestics(neighbour, finishNode, 'manhattan_distance')
                    neighbour.fCost = neighbour.gCost + neighbour.hCost
                    neighbour.previousNode = currentNode   
                    //openList.push(neighbour) 
                    console.log("after "+neighbour.gCost)
                }

            }else{
                    neighbour.gCost = ng
                    neighbour.hCost = hurestics(neighbour, finishNode, 'manhattan_distance')
                    neighbour.fCost = neighbour.gCost + neighbour.hCost
                    neighbour.previousNode = currentNode   
                    openList.push(neighbour) 
            }

        }  
    }

}

function getDistance(node, target){
    return manhattanDistance(node, target)
}

function hurestics(node, targetNode, huresticFunction){
    if(huresticFunction === 'manhattan_distance'){
        return manhattanDistance(node, targetNode)
    }else if(huresticFunction === 'diagonal_distance'){
        return diagonalDistance(node, targetNode)
    }else{
        return euclideanDistance(node, targetNode)
    }
}

function manhattanDistance(node, targetNode){
    return Math.abs(node.row - targetNode.row) + Math.abs(node.col - targetNode.col)
}

function diagonalDistance(node, targetNode){
    return Math.max(Math.abs(node.row - targetNode.row), Math.abs(node.col - targetNode.col))
}

function euclideanDistance(node, targetNode){
    return Math.sqrt(Math.pow((node.row - targetNode.row), 2) + Math.pow((node.col - targetNode.col), 2))
}


function getNeighbours(grid, node){
    const neighbours = []
    const {row, col} = node

    if(row > 0) neighbours.push(grid[row - 1][col])
    if(row < grid.length - 1) neighbours.push(grid[row + 1][col])
    if(col > 0) neighbours.push(grid[row][col - 1])
    if(col < grid[0].length - 1) neighbours.push(grid[row][col + 1])
    
    //console.log(neighbours)
    return neighbours.filter(neighbour => !neighbour.isWall)
}

export function getAStarPath(finishNode){
    const aStarPath = []
    
    //if there is no path
    if(finishNode.previousNode === null)
        return aStarPath

    var currentNode = finishNode
    while(currentNode !== null){
        currentNode = { ...currentNode, isPath : true}
        aStarPath.unshift(currentNode)
        currentNode = currentNode.previousNode
    }
    return aStarPath
}

function getAllNodes(grid){
    const nodes = []
    for(let row of grid){
        for(let node of row){
            nodes.push(node)
        }
    }
    return nodes
}