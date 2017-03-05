import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import CoreLayout from '../layouts/CoreLayout'

class AppContainer extends Component {
  static propTypes = {
    store  : PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { store } = this.props
    return (
      <Provider store={store}>
        <CoreLayout />
      </Provider>
    )
  }
}

export default AppContainer
