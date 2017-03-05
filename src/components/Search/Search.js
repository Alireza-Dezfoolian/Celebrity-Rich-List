import React, { Component, PropTypes } from 'react'
import './Search.scss'

class Search extends Component {

constructor() {
    super();
    this.applyFilter = this.applyFilter.bind(this);
  }

  applyFilter(input, e) {
    this.props.callbackParent(input, e.target.value);
  }

  render () {
  	if(this.props.input){
    return (
		<div className="col-sm-6 form-items">
			<div className="form-group">
				<label htmlFor={this.props.title}>{this.props.title}</label>
				<input onChange={(e) => this.applyFilter(this.props.title, e)} type="text" className="form-control"/>
			</div>
		</div>
    ) 
    } else {
	return (
	  <div className="col-sm-6 form-items">
       <label htmlFor={this.props.title}>{this.props.title}</label>
	     <select onChange={(e) => this.applyFilter(this.props.title, e)} className="form-control">
	     {(this.props.data).map((d, i)=> 
	    	<option key={d} value={d}>{d}</option>)}
      </select>
	  </div>
	) 
    }
  }
}

export default Search
