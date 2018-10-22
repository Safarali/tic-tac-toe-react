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
            xIsNext: true,
            stepNumber: 0
        }
    }
    handleClick = (i) => {
        const history = this.state.history.slice(0, this.state.stepNumber + 1)
        const current = history[history.length - 1];
        const squares = [...current.squares];
        if (calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : '0'
        this.setState(() => ({
            history: history.concat({ squares }),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        }));
    };

    jumpTo = (move) => {
        this.setState(() => ({
            stepNumber: move,
            xIsNext: (move % 2) === 0
        }));
    };

      render() {
          const history = this.state.history;
          const current = history[this.state.stepNumber];
          const winner = calculateWinner(current.squares);

          const moves = history.map((step, move) => {
            const desc = move ?
                `Go to move to # ${move} ` :
                'Go to start game';

            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
          });




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
                  <ol>{moves}</ol>
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
