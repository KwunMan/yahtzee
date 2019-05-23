import React, { Component } from 'react';
import './RuleRow.css'

class RuleRow extends Component {
  render() {
    const { score, name, doScore, description } = this.props;
    const disabled = score !== undefined;
    return (
      <div className={`RuleRow-${disabled ? "disabled" : "active"} RuleRow`} onClick={disabled ? null : doScore }>
        <div className="RuleRow-name">{name}</div>
        <div className="RuleRow-score">{disabled ? score : description}</div>
      </div>
    )
  }
}

export default RuleRow;