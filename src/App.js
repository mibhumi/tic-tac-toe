import React, { Component } from 'react';
import './App.css';
import './css/square.css';
import Square from './component/Square';
import calculateWinner from './component/calculateWinner';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            currentTurn: true,
            player1: '',
            player2: '',
            display: 'none',
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
          return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            currentTurn: this.state.xIsNext,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    reset = () => {
        this.setState({ squares: [] });
    }

    startGame = () => {
        this.setState({
            player1: document.getElementById("p1").value,
            player2: document.getElementById("p2").value,
            display: 'block'
        });
        // var elems = document.getElementsByClassName('game-board');
        // elems[0].style.display = 'block';
    }


    render() {
        const winner = calculateWinner(this.state.squares);
        let   status;
        let player1 = this.state.player1;
        let player2 = this.state.player2;
        if (winner) {
            status = 'Winner: ' + (this.state.currentTurn ? player1 : player2);
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? player1 : player2);
        }
        
        return (
            <div className="container">
                <div className="game-player">
                    <label>Player 1:</label><input type="text" class="textbox-width" name="p1" id="p1"/><br/>
                    <label>Player 2:</label><input type="text" class="textbox-width" name="p2" id="p2"/><br/>
                    <button className="button-color" onClick={ this.startGame }>Start</button>
                </div>
                <div className="game-board" style={{display:`${ this.state.display }`}}>
                    <div className="status">{status}</div>
                    <div>
                        <button class="button-color" onClick={ this.reset } >Reset</button>
                    </div>
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
            </div>
        );
    }
}

export default App;