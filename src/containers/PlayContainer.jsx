import React, { Component } from 'react'
import Play from '../components/Play'

class PlayContainer extends Component {
  render() {
    return (
      <div>
        <Play {...this.props} />
      </div>
    )
  }
}

export default PlayContainer
