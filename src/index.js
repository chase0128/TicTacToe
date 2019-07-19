import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
function Square(props){
  return (
    <button className="square" onClick={props.click}>{props.value}</button>
  )
}

class Board extends React.Component {

  renderSquare(i) {
    return <Square value={this.props.square[i]} click={()=>{this.props.handleClick(i)}}/>;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state={
      history:[{
        square:Array(9).fill(null),
        stepNum:0
      }],
      currentPlayer:true,
    }
    this.renderGoBack=this.renderGoBack.bind(this);
  }
  jumpTo(index){
    var newHistory=this.state.history.slice(0,index+1);
    this.setState({
      history:newHistory,
      currentPlayer:newHistory[newHistory.length-1].stepNum%2?false:true
    })
  }
  handleClick(i){
    var newHistory=this.state.history.slice();
    var newSquare=newHistory[newHistory.length-1].square.slice();
    var roundNum=newHistory[newHistory.length-1].stepNum;
    newSquare[i]=(this.state.currentPlayer?"X":"O");
    newHistory.push({square:newSquare,stepNum:roundNum+1});
    this.setState({
      history:newHistory,
      currentPlayer:!this.state.currentPlayer});
  }

  renderGoBack(history,index){

    return (
      <li key={index}>
        <button onClick={()=>this.jumpTo(index)}>{index?"Moveto"+index:"restart game"}</button>
      </li>
    )
  }
  render() {
    let winner=calculateWinner(this.state.history[this.state.history.length-1].square);
    let status;
    if(winner){
       status=winner+" is win!"
    }
    else {
      status="The next player is "+(this.state.currentPlayer?"X":"O")+" !";
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board square={this.state.history[this.state.history.length-1].square} handleClick={(i)=>{this.handleClick(i);}} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{this.state.history.map(this.renderGoBack)}</ol>
        </div>
      </div>
    );
  }
}


// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}