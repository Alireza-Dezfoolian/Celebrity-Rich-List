import React, { Component, PropTypes } from 'react'
import './Results.scss'

class Results extends Component {

constructor(props) {
    super(props);
  }
  render () {
    return (
      <div className="alert alert-info">
        <strong>No: {this.props.rank}</strong>
        <h3>{this.props.name}</h3>
        <h5>Net Worth: <strong>{this.props.networth}</strong></h5>
        <p>Age: {this.props.age}</p>
        <p>Country of Birth: <strong>{this.props.country}</strong></p>
      </div>
    )
  }
}

export default Results