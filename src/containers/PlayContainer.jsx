import React, { Component } from 'react'
import Game from '../components/Game'
import {establishSocket} from '../actions/PlayActions'
import {connect } from 'react-redux'

class PlayContainer extends Component {
  render() {
    return (
      <div>
        <Game {...this.props} />
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
      establishSocket: () => dispatch(establishSocket('localhost:8000', 'billy'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayContainer)
