import React, { Component } from "react";
import { BoggleBuilder } from "./Boggle";
import style from "../../style";
import BoggleCharacter from "./BoggleCharacter";
import Grid from "../Grid/Grid";
import Button from "../Button/Button";
import Text from "../Text/Text";

class BoggleLayout extends Component {

  static get initialGameState() {
    return {
      word: [],
      time: 120,
      startTime: 120,
      minDensity: 25,
      resultWords: [],
      Game: new BoggleBuilder().build(25)
    };
  }

  state = BoggleLayout.initialGameState;

  wordEng() {
    if (this.state.resultWords.length > 0) {
      return this.state.resultWords;
    }
    return this.state.word.map(([r, c]) => this.state.Game.board[r][c]).join("");
  }

  renderBoard() {
    const N = this.state.Game.boardSize;
    const word = this.state.word;
    const board = this.state.Game.board;
    const boardState = this.state.Game.boardState;
    const isLast = (r, c) => word.length && word[word.length - 1][0] === r && word[word.length - 1][1] === c;
    const chars = [];

    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        chars.push(
          <BoggleCharacter
            key={String(r) + String(c)}
            handleClick={this.toggleSelected}
            char={board[r][c]}
            isLast={isLast(r, c)}
            isSelected={boardState[r][c]}
            row={r}
            col={c}
            style={style.GameCharacter}
          />
        );
      }
    }

    return chars;
  }

  handleStart = () => {
    if (this.state.interval !== undefined) {
      clearInterval(this.state.interval);
    }
    this.setState({time: this.state.startTime});
    this.setState({word: []});
    this.setState({resultWords: []});
    this.setState({Game: new BoggleBuilder().build(this.state.minDensity)})
    this.startCountdown(this.state.time);
  };

  async startCountdown(seconds) {
    // This is the audio file for ending the round. I didn't want to find a .wav file and deal with that stuff
    var snd = new Audio("data:audio/wav;base64,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");  
      
    const interval = setInterval(() => {
      this.setState({
        time: this.state.time - 1
      });
      if (this.state.time <= 0) {
        clearInterval(interval);
        snd.currentTime = 0;
        snd.play();
      }
    }, 1000);
    this.setState({interval});
    return;
  }

  handleInvalidSelection = () => {
    window.alert("Selected character must be adjacent (horizontal, vertical, or diagonal) to last selected character");
  };

  handleInvalidUnselection = () => {
    window.alert("Unselected character must be the same as last selected character");
  };

  toggleSelected = (r, c) => {
    let word = this.state.word;

    const Game = this.state.Game;
    const state = !Game.boardState[r][c];

    if (state) {
      if (Game.validateSelect(word, [r, c])) {
        Game.boardState[r][c] = state;
        word.push([r, c]);
      } else {
        this.handleInvalidSelection();
      }
    } else {
      if (Game.validateUnselect(word, [r, c])) {
        Game.boardState[r][c] = state;
        word.pop();
      } else {
        this.handleInvalidUnselection();
      }
    }

    this.setState({
      Game,
      word
    });
  };

  handleResetWord = () => {
    const Game = this.state.Game;
    Game.boardState = Game.createBoard(Game.boardSize, false);

    this.setState({
      Game,
      word: []
    });
  };

  showResults = () => {
    this.setState({resultWords: this.state.Game.findAllWords()})
  }

  handleChangeSeconds(event) {
    if (event.target.value === "") {
      this.setState({startTime: 0});
    } else if (!isNaN(String(event.target.value))) {
      this.setState({startTime: parseInt(event.target.value, 10)});
    }
  }

  handleChangePoints(event) {
    if (event.target.value === "") {
      this.setState({minDensity: 0});
    } else if (!isNaN(String(event.target.value))) {
      this.setState({minDensity: parseInt(event.target.value, 10)});
    }
  }

  render() {
    const { Game } = this.state;

    return (
      <Grid style={style.Grid}>

        <Text style={style.Word} text={this.wordEng()} />

        <Grid style={style.GameBoard(Game.boardSize)}>{this.renderBoard()}</Grid>

        <div style={style.ButtonGrid}>
          <Button text="New Game" style={style.Button} handleClick={this.handleStart} />
          <Button text="Check Word" disabled={!this.state.word.length} style={style.Button} handleClick={() => 
            {
              window.open(`https://www.merriam-webster.com/dictionary/${this.state.word.map(([r, c]) => this.state.Game.board[r][c]).join("")}`);
              this.handleResetWord();
            }} />
          <Button text="Solve Board" disabled={this.state.time > 0} style={style.Button} handleClick={this.showResults}/>
          <Button text="Clear Word" disabled={!this.state.word.length} style={style.Button} handleClick={this.handleResetWord} />
        </div>
        <div>
          <div>
            Total Seconds: 
            <input type="text" size="5" value={this.state.startTime} onChange={(event) => this.handleChangeSeconds(event)}/>
          </div>
          <div>
            Min Points/Board: 
            <input type="text" size="5" value={this.state.minDensity} onChange={(event) => this.handleChangePoints(event)}/>
          </div>
        </div>
        
        <Text style={style.Time} text={this.state.time} />
      </Grid>
    );
  }
}

export default BoggleLayout;
