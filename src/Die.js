import React, { Component } from "react";
import "./Die.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix } from '@fortawesome/pro-solid-svg-icons';

class Die extends Component {
  static defaultProps = {
    dieFace: [faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix],
    val: 6
  }  
  lockDie = () => {
    this.props.handleClick(this.props.idx);
  }
  render() {
    const { locked, val, disabled, rolling, dieFace } = this.props;
    return (
      <FontAwesomeIcon 
        disabled={disabled} 
        icon={dieFace[val - 1]} 
        size="4x" 
        className={`Die ${locked ? "Die-locked" : ""} ${rolling ? "Die-rolling" : ""}`} 
        onClick={this.lockDie}
      />
    );
  }
}

export default Die;
