import React, { Component, Fragment } from 'react'

export default class Game extends Component {
  constructor(props) {
    super(props)
    this.input = null
  }

  handleSubmit = event => {
    if(event) event.preventDefault()
    const username = this.input.value
    this.props.establishSocket(username)
  }

  render() {
    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Your name"
            type="text"
            ref={element => {
              this.input = element
            }}
          />
          <button>Submit!</button>
        </form>
      </Fragment>
    )
  }
}
