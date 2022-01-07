var hitEdge = false
export function depthFirstSearch(grid, startNode, finishNode){
    
    if(!startNode || !finishNode || startNode === finishNode)
        return false

    const visitedNodes = []
    const stack = [startNode]
    while(stack.length !== 0){
        const currentNode = stack.pop()
        if(currentNode.isWall) continue
        if(currentNode.isVisited) continue
        currentNode.isVisited = true
        visitedNodes.push(currentNode)
        if(currentNode === finishNode)
            return visitedNodes
        const neighbourNodes = getNeighbourNodes(grid, currentNode)
        for(const neighbour of neighbourNodes){
            neighbour.previousNode = currentNode
            stack.push(neighbour)
        }
    }

    //If target not found
    return visitedNodes
}

function getNeighbourNodes(grid, node){
    const neighbours = []
    const {row, col} = node
    
    if(hitEdge){
        if(row > 0) neighbours.push(grid[row - 1][col])
        if(row < grid.length - 1) neighbours.push(grid[row + 1][col])
        if(col > 0) neighbours.push(grid[row][col - 1])
        if(col < grid[0].length - 1) neighbours.push(grid[row][col + 1])
        else{
            hitEdge = false
        }
    }else{
        if(col > 0) neighbours.push(grid[row][col - 1])
        if(col < grid[0].length - 1) neighbours.push(grid[row][col + 1])
        if(row > 0) neighbours.push(grid[row - 1][col])
        if(row < grid.length - 1) 
            neighbours.push(grid[row + 1][col])
        else
            hitEdge = true
    }
    return neighbours.filter(neighbour => !neighbour.isVisited)
}

export function getDFSPath(finishNode){
    const DFSPath = []
    
    //if there is no path
    if(finishNode.previousNode === null)
        return DFSPath

    var currentNode = finishNode
    while(currentNode !== null){
        currentNode = { ...currentNode, isPath : true}
        DFSPath.unshift(currentNode)
        currentNode = currentNode.previousNode
    }
    return DFSPath
}
