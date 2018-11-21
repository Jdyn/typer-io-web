import React, { Component } from 'react'

export default class Game extends Component {
  componentWillMount() {
    this.props.establishSocket()
  }

  render() {
    return (
      <div>
        This is the play component
      </div>
    )
  }
}
