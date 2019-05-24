import React, { Component } from "react";
import Dice from "./Dice";
import ScoreTable from "./ScoreTable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo } from '@fortawesome/pro-solid-svg-icons';
import "./Game.css";

const NUM_DICE = 5;
const NUM_ROLLS = 3;
const initialState = {
  dice: Array.from({ length: NUM_DICE }),
  locked: Array(NUM_DICE).fill(false),
  rollsLeft: NUM_ROLLS,
  rolling: false,
  scores: {
    ones: undefined,
    twos: undefined,
    threes: undefined,
    fours: undefined,
    fives: undefined,
    sixes: undefined,
    threeOfKind: undefined,
    fourOfKind: undefined,
    fullHouse: undefined,
    smallStraight: undefined,
    largeStraight: undefined,
    yahtzee: undefined,
    chance: undefined,
    bonus: 0
  },
};

class Game extends Component {
  state = initialState;
  
  componentDidMount() {
    this.animateRoll();
  }

  animateRoll = () => {
    this.setState({ rolling: true }, () => {
      setTimeout(this.roll, 1000) // animate rolling action for 1 second
    });
  }

  roll = (evt) => {
    // roll dice whose indexes are in reroll
    this.setState(st => ({
      dice: st.dice.map((d, i) =>
        st.locked[i] ? d : Math.ceil(Math.random() * 6)
      ),
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      rollsLeft: st.rollsLeft - 1,
      rolling: false
    }))
  }

  toggleLocked = (idx) => {
    // toggle whether idx is in locked or not
    if (this.state.rollsLeft > 0 && !this.state.rolling) { 
      this.setState(st => ({
        locked: [
          ...st.locked.slice(0, idx),
          !st.locked[idx],
          ...st.locked.slice(idx + 1)
        ]
      }));
    }
  }

  doScore = (rulename, ruleFn) => {
    // evaluate this ruleFn with the dice and score this rulename
    this.setState(st => ({
      scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
      rollsLeft: NUM_ROLLS,
      locked: Array(NUM_DICE).fill(false)
    }));
    this.state.rolling ? setTimeout(1000) : this.animateRoll(); // disable scoring for 1 second when dice are rolling
  }

  restartGame = () => {
    if (this.state.rolling) {
      setTimeout(1000); // disable restart for 1 second when dice are rolling
    } else {
      this.setState(initialState)
      this.animateRoll()
    }
  }

  gameOver() {
    // determine if the game is over by checking if all rows in the ScoreTable have been clicked
    return Object.keys(this.state.scores).every(key => this.state.scores[key] !== undefined)
  }

  render() {
    const { dice, locked, rollsLeft, scores, rolling } = this.state;
    return (
      <div className='Game'>
        <header className='Game-header'>
          <h1 className='App-title'>Yahtzee!</h1>
          <section className='Game-dice-section'>
            <Dice
              dice={dice}
              locked={locked}
              handleClick={this.toggleLocked}
              disabled={rollsLeft === 0}
              rolling={rolling}
            />
            <div className='Game-button-wrapper'>
              <button
                className='Game-reroll'
                disabled={locked.every(x => x) || rollsLeft === 0 || rolling || this.gameOver()} //disable button when all dice locked, rolling, no rolls left, or game over 
                onClick={this.animateRoll}
              >
                {this.gameOver() ? "Game Over" : rollsLeft + " Rolls Left"}
              </button>
            </div>
            <FontAwesomeIcon
              icon={faUndo}
              size="2x"
              onClick={this.restartGame}
              className='Game-restart'
            />
          </section>
        </header>
        <ScoreTable rolling={rolling} doScore={this.doScore} scores={scores} />
      </div>
    );
  }
}

export default Game;
