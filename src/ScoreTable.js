import React from 'react';
import RuleRow from './RuleRow';
import './ScoreTable.css';
import { ones, twos, threes, fours, fives, sixes, threeOfKind, fourOfKind, fullHouse, smallStraight, largeStraight, yahtzee, chance, bonus } from './Rules';

const ScoreTable = ({ scores, doScore, rolling }) => {
  function upperTotal() {
    const { ones, twos, threes, fours, fives, sixes } = scores;
    return (ones || 0) + (twos || 0) + (threes || 0) + (fours || 0) + (fives || 0) + (sixes || 0);
  }
  
  function calculateTotalScore() {
    let totalScore = 0;
    Object.keys(scores).forEach(key => {
      if(scores[key]) totalScore += scores[key];
    });
    return totalScore + (upperTotal() > 62 ? 35 : 0);
  }

  return (
    <div className="ScoreTable">
      <section className="ScoreTable-section">
        <h2>Upper</h2>
        <div>
            <RuleRow name="Ones" score={scores.ones} description={ones.description} doScore={evt => rolling ? setTimeout(1000) : doScore("ones", ones.evalRoll)} />
            <RuleRow name="Twos" score={scores.twos} description={twos.description} doScore={evt => rolling ? setTimeout(1000) : doScore("twos", twos.evalRoll)} />
            <RuleRow name="Threes" score={scores.threes} description={threes.description} doScore={evt => rolling ? setTimeout(1000) : doScore("threes", threes.evalRoll)} />
            <RuleRow name="Fours" score={scores.fours} description={fours.description} doScore={evt => rolling ? setTimeout(1000) : doScore("fours", fours.evalRoll)} />
            <RuleRow name="Fives" score={scores.fives} description={fives.description} doScore={evt => rolling ? setTimeout(1000) : doScore("fives", fives.evalRoll)} />
            <RuleRow name="Sixes" score={scores.sixes} description={sixes.description} doScore={evt => rolling ? setTimeout(1000) : doScore("sixes", sixes.evalRoll)} />
        </div>
        <RuleRow name="Upper Total" score={upperTotal()} doScore={undefined} />        
        <RuleRow name="Bonus" score={upperTotal() > 62 ? 35 : undefined} description={bonus.description} doScore={undefined} />
      </section>
      <section className="ScoreTable-section ScoreTable-section-lower">
        <h2>Lower</h2>
        <div>
            <RuleRow name="Three of Kind" score={scores.threeOfKind} description={threeOfKind.description} doScore={evt => rolling ? setTimeout(1000) : doScore("threeOfKind", threeOfKind.evalRoll)} />
            <RuleRow name="Four of Kind" score={scores.fourOfKind} description={fourOfKind.description} doScore={evt => rolling ? setTimeout(1000) : doScore("fourOfKind", fourOfKind.evalRoll)} />
            <RuleRow name="Full House" score={scores.fullHouse} description={fullHouse.description} doScore={evt => rolling ? setTimeout(1000) : doScore("fullHouse", fullHouse.evalRoll) } />
            <RuleRow name="Small Straight" score={scores.smallStraight} description={smallStraight.description} doScore={evt => rolling ? setTimeout(1000) : doScore("smallStraight", smallStraight.evalRoll)} />
            <RuleRow name="Large Straight" score={scores.largeStraight} description={largeStraight.description} doScore={evt => rolling ? setTimeout(1000) : doScore("largeStraight", largeStraight.evalRoll)} />
            <RuleRow name="Yahtzee" score={scores.yahtzee} description={yahtzee.description} doScore={evt => rolling ? setTimeout(1000) : doScore("yahtzee", yahtzee.evalRoll)} />
            <RuleRow name="Chance" score={scores.chance} description={chance.description} doScore={evt => rolling ? setTimeout(1000) : doScore("chance", chance.evalRoll)} />
        </div>
        <h2>Total score</h2>
        <h3>{calculateTotalScore()} points</h3>
      </section>
    </div>
  )
}

export default ScoreTable;