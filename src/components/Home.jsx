import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Loader from './Loader'

const defaultProps = {}

const propTypes = {}

class Home extends Component {
  componentWillMount() {}

  render() {
    const text = ['Play Multiplayer', 'Play Solo', 'Play Invitational']

    return (
      <Fragment>
        {text.map(element => (
          <Link to="/play" key={element}>
            <p>{element}</p>
          </Link>
        ))}
      </Fragment>
    )
  }
}

Home.propTypes = propTypes
Home.defaultProps = defaultProps

export default Home
