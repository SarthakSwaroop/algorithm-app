import React, { Component } from 'react'
import './Node.css'

export class Node extends Component {

    constructor(props) {
      super(props)
      this.state = {
        extraclassName : ''
      }

      this.ref = React.createRef()
    }
  
    //Toggle node to visited
    toggleVisited = () => {
      this.ref.current.className = 'node visited-node'
    }

    togglePath = () => {
      this.ref.current.className = 'node path-node'
    }

    toggleReset = () => {
      this.ref.current.className = 'node '
    }

    toggleStart = () => {
      this.ref.current.className = 'node start-node'
    }

    toggleFinish = () => {
      this.ref.current.className = 'node finish-node'
    }

    toggleWall = () => {
      this.ref.current.className = 'node wall-node'
    }
    

    render() {
        const {row, col, isStart, isFinish, isVisited, isWall, isPath, onMouseDown, onMouseEnter, onMouseUp} = this.props
        //If current node is Start or target node then add additions css property to them
        const extraclassName = (isPath)? 'path-node' : (isStart)? 'start-node' : (isFinish)? 'finish-node' : (isWall) ? 'wall-node':(isVisited) ? 'visited-node' : ''
        //console.log(extraclassName)

        return (
          <div ref={this.ref}
          data-toggle="tooltip" data-placement="top" title={`${row} ${col}`}
            id={`node-${row}-${col}`}
            className={`node ${extraclassName}`}
            
            onMouseDown={() => onMouseDown(row, col)}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseUp={() => onMouseUp()}>
           </div>
        );
    }
}

export default Node
