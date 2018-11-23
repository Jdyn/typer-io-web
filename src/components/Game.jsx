import React, { Component } from 'react'

export default class Game extends Component {
  componentWillMount() {
    this.props.establishSocket()
  }

  handleClick = () => {
    console.log(this.props.socket)
    this.props.socket.emit('log info', {})
  }

  render() {
    return (
      <div>
        This is the play component
        <button onClick={this.handleClick}>
          log counts on server
        </button>
      </div>
    )
  }
}
