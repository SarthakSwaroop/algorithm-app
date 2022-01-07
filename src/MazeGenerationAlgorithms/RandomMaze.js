var wallsToAnimate = [];
export function randomeMaze(
  grid,
  startCol,
  endCol,
) {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      let randomValue = Math.random();
      
        const node = grid[row][col];
        if (node.isStart || node.isFinish) {
          continue;
        }
        if (randomValue < 0.3) {
          node.isWall = true;
          wallsToAnimate.push(node);
        }
      
    }
  }
  return wallsToAnimate;
}
