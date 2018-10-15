import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';
import calculateWinner from './algorithm';
import './index.css';



class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true
        }
    }
    handleClick = (i) => {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = [...current.squares];
        if (calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : '0'
        this.setState(() => ({
            history: history.concat({ squares }),
            xIsNext: !this.state.xIsNext
        }));
    };
      render() {
          const history = this.state.history;
          const current = history[history.length - 1];
          const winner = calculateWinner(current.squares);
          let status;
          if(winner){
              status = 'Winner: ' + winner
          } else {
              status = `Next player ${this.state.xIsNext ? 'X' : '0'}`;
          }


            return (
              <div className="game">
                <div className="game-board">
                  <Board
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}
                  />
                </div>
                <div className="game-info">
                  <div>{status}</div>
                  <ol>{/* TODO */}</ol>
                </div>
              </div>
            );
      }
}

// ========================================

ReactDOM.render(
  <Game/>,
  document.getElementById('root')
);
