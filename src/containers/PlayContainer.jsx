import React, { Component } from 'react'
import Play from '../components/Play'
import { connect } from 'react-redux'

class PlayContainer extends Component {
  render() {
    return (
      <div>
        <Play {...this.props} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  // console.log(state.home.socket)
  return {
    socket: state.home.socket,
    client: state.home.client
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayContainer)
