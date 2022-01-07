export function breadthFristSearch(grid, startNode, finishNode){

    if(!startNode || !finishNode || startNode === finishNode)
        return false

    const visitedNodes = []
    const queue = [startNode]
    while(queue.length !== 0){
        const currentNode = queue.shift()
        if(currentNode.isWall) continue
        if(currentNode.isVisited) continue
        currentNode.isVisited = true
        visitedNodes.push(currentNode)
        if(currentNode === finishNode) return visitedNodes
        const neighbours = getNeighbours(grid, currentNode)
        for(const neighbour of neighbours){
            neighbour.previousNode = currentNode
            queue.push(neighbour)
        }
    }

    //If target not found
    return visitedNodes
}

function getNeighbours(grid, node){
    const neighbours = []
    const {row, col} = node
    if(row > 0) neighbours.push(grid[row - 1][col])
    if(row < grid.length - 1) neighbours.push(grid[row + 1][col])
    if(col > 0) neighbours.push(grid[row][col - 1])
    if(col < grid[0].length - 1) neighbours.push(grid[row][col + 1])

    return neighbours.filter(neighbour => !neighbour.isVisited)
}

export function getBFSPath(finishNode){
    const BFSPath = []
    
    //if there is no path
    if(finishNode.previousNode === null)
        return BFSPath

    var currentNode = finishNode
    while(currentNode !== null){
        currentNode = { ...currentNode, isPath : true}
        BFSPath.unshift(currentNode)
        currentNode = currentNode.previousNode
    }
    return BFSPath
}
