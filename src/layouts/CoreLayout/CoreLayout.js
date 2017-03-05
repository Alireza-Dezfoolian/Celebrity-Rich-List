import React, { Component, PropTypes } from 'react'
import Header from '../../components/Header'
import Input from '../../components/Search/Search'
import Results from '../../components/Results/Results'
import { getUniqueData, filterAlphabetic, currencySign, currencyFormater } from '../../components/Utils/Utils'

//json mock @imported to be bundle with rest, should be loaded async via HTTP request in the real application
import data from '../../json/celebrityRichList.json'

import './CoreLayout.scss'
import '../../styles/core.scss'

class CoreLayout extends Component {

constructor() {
    super();
    this.state = {celebrityList : []};
    this.searchFilter = {birthPlace: 'Show All', currencyConvertor: 'US dollar', search: '', orderBy: 'Rank'};
    this.formInputs = [];
    this.setFilter = this.setFilter.bind(this);
 }

componentWillMount() {
    this.CelebrityRichList();
    this.setFilter();
}

//switch searchFilter
setSearchFilter(input, newState){
	switch(input){
		case 'Currency Convertor': 
			this.searchFilter.currencyConvertor = newState;
			break;
		case 'Birthplace': 
			this.searchFilter.birthPlace = newState;
			break;
		case 'Order By': 
			this.searchFilter.orderBy = newState;
			break;
		case 'Search':
			this.searchFilter.search = newState;
	}
}

//handle all changes in the search filter
setFilter(input, newState) {
	//set vars
	var cl = this.celebrityList.map(a => Object.assign({}, a)),
	result, sign;

	//change the data
	this.setSearchFilter(input, newState);

	//Currency Convertor
	var convertor = this.currencyVal[this.searchFilter.currencyConvertor];
	for (let i=0, l= cl.length; i < l; i++) {
        cl[i]['netWorth'] = currencyFormater(Math.round(cl[i]['netWorth'] / convertor), 
        	currencySign(this.searchFilter.currencyConvertor));
	}
	result = cl;

	//order by
	let value = this.searchFilter.orderBy.toLowerCase();
	switch(value){
		case 'name':
			result = cl.sort(filterAlphabetic);
			break;
		case 'age':
		default:
			result = cl.sort((x, y) => x[value] - y[value]);
	}

	//search text field 
	cl = cl.filter((cl) => cl.rank.toString().indexOf(this.searchFilter.search) > -1 ||
	 cl.name.indexOf(this.searchFilter.search) > -1 ||
	  cl.netWorth.toString().indexOf(this.searchFilter.search) > -1 ||
	   cl.age.indexOf(this.searchFilter.search) > -1 ||
	    cl.country.indexOf(this.searchFilter.search) > -1);

	//filter birthplace
	result = this.searchFilter.birthPlace!=='Show All' ? 
	cl.filter((cl) => cl.country === this.searchFilter.birthPlace) :
	cl;

	//change the state for view change
    this.setState({
	 celebrityList: result
	})
}

//init the data
CelebrityRichList() { 
	this.headingOne = data.pageTitleH1;
	this.headingTwo = data.pageTitleH2;
	this.desc = data.description;
	this.ref = data.referenceLink;

	//form data
	this.formInputs = [
	{label: 'Birthplace', data:  getUniqueData(data.celebrityList, 'Show All')}, 
	{label:'Currency Convertor', data:['US dollar', 'Euro', 'Australian Dollar']}, 
	{label:'Search'}, 
	{label:'Order By', data:['Rank', 'Name', 'Age']}];

	//creating 
	this.currencyVal = {'US dollar': data.usDollarValue, 'Euro': data.euroValue, 'Australian Dollar': data.australianDollarValue};
	this.celebrityList = data.celebrityList;

	this.setState({
	    celebrityList: this.celebrityList
	})
}
  render () {
    return (
      <div className='container text-center'>
	    <Header ph1={this.headingOne} ph2={this.headingTwo} des={this.desc} link={this.ref}/>
	    <div className='jumbotron display-table'>
	    {(this.formInputs).map((x, i)=> 
	    	<Input key={x.label} title={x.label} input={x.label==='Search'} data={x.data} callbackParent={(input, newState) => this.setFilter(input, newState) }/>)}
	    </div>
	    <div className="result-wrapper">
		    {this.state.celebrityList.length ?
		    	(this.state.celebrityList).map((x, i)=> 
		    	<Results key={x.rank} rank={x.rank} name={x.name} networth={x.netWorth} age={x.age} country={x.country}/> ): 
		    	<div className='alert alert-danger'>
			        <strong>No Results Found</strong>
			    </div>
		    }
	    </div>
	  </div>
    )
  }
}

export default CoreLayout
