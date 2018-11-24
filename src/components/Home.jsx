import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Loader from './Loader'

const defaultProps = {}

const propTypes = {}

class Home extends Component {
  constructor(props) {
    super(props)
    this.input = null
  }

  handleSubmit = event => {
    if (event) event.preventDefault()
    const username = this.input.value
    // this.props.establishSocket(username)
  }

  render() {
    const text = ['Play Multiplayer', 'Play Solo', 'Play Invitational']

    return (
      <Fragment>
        {text.map(element => (
          <Link to="/play" key={element}>
            <p>{element}</p>
          </Link>
        ))}
        <a>{this.props.client.username}</a>
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

Home.propTypes = propTypes
Home.defaultProps = defaultProps

export default Home
