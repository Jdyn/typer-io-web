import React, { Component } from 'react'
import Home from '../components/Home'
import { connect } from 'react-redux'
import { registerSocket } from '../actions/HomeActions'

class HomeContainer extends Component {
  render() {
    return (
      <div>
        <Home {...this.props} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state.game.socket)
  return {
    hasErrored: state.game.hasErrored,
    inProgress: state.game.inProgress,
    socket: state.game.socket,
    client: state.game.client
  }
}

const mapDispatchToProps = dispatch => {
  return {
    registerSocket: username => dispatch(establishSocket('localhost:8000', username)),
    establishSocket: socket =>
  }
}

export default connect(mapStateToProps)(HomeContainer)
