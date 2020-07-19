import React, { Component } from "react";
import { BoggleBuiler } from "./Boggle";
import style from "../../style";
import BoggleCharacter from "./BoggleCharacter";
import Grid from "../Grid/Grid";
import Button from "../Button/Button";
import List from "../List/List";
import Text from "../Text/Text";

class BoggleLayout extends Component {
  static formatAccuracy(accuracy) {
    return `${accuracy.toFixed(2)}%`;
  }

  static get initialGameState() {
    return {
      score: 0,
      accuracy: 0,
      word: [],
      Game: new BoggleBuiler().build()
    };
  }

  state = BoggleLayout.initialGameState;

  get word() {
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

  ////////////////////////
  // Event Handlers
  ////////////////////////
  handleStart = () => {
    this.setState(BoggleLayout.initialGameState);
  };

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

  handleSubmitWord = async () => {
    const Game = this.state.Game;

    await Game.validateWord(this.word);

    this.setState(
      {
        Game
      },
      this.handleResetWord
    );
  };

  handleResetWord = () => {
    const Game = this.state.Game;
    Game.boardState = Game.createBoard(Game.boardSize, false);

    this.setState({
      Game,
      word: []
    });
  };

  ////////////////////////
  // Render
  ////////////////////////
  render() {
    const { Game } = this.state;

    return (
      <Grid style={style.Grid}>

        {/*TOP*/}
        <Button text="New Game" style={style.RestartButton} handleClick={this.handleStart} />
        <Text style={style.Word} text={this.word} fluid={true} />

        {/*MIDDLE*/}
        <Grid style={style.GameBoard(Game.boardSize)}>{this.renderBoard()}</Grid>

        {/*BOTTOM*/}
        <Button text="Submit Word" disabled={!this.state.word.length} style={style.SubmitWordButton} handleClick={this.handleSubmitWord} />
        <Button text="Clear Word" disabled={!this.state.word.length} style={style.ClearWordButton} handleClick={this.handleResetWord} />
      </Grid>
    );
  }
}

export default BoggleLayout;
