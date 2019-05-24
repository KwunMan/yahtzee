import React from 'react';
import './RuleRow.css'

const RuleRow = ({ score, name, doScore, description }) => {
  const disabled = score !== undefined;
  const isBonus = disabled && doScore === undefined;
  const isTotalScore = name === "Upper Total";
  return (
    <div 
      className={`RuleRow-${disabled || isBonus || isTotalScore ? "disabled" : "active"} RuleRow`} 
      onClick={disabled ? null : doScore }
    >
      <div className="RuleRow-name" style={isTotalScore ? {fontWeight: 400} : null}>{name}</div>
      <div className="RuleRow-score" style={isTotalScore ? { fontWeight: 400 } : null}>{disabled ? score : description}</div>
    </div>
  )
}

export default RuleRow;