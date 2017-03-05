import React, { Component, PropTypes } from 'react'
import './Header.scss'

class Header extends Component {

constructor(props) {
    super(props);
  }
  render () {
    return (
       <div className="jumbotron">
        <h1>{this.props.ph1}</h1>
        <h2>{this.props.ph2}</h2>
        <p>{this.props.des}</p>
        <p>Reference: <a href={this.props.link} target='_blank'>{this.props.link}</a></p>
      </div>
    )
  }
}

export default Header
