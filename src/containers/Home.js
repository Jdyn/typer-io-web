import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Home extends Component {
  render() {
    return (
      <div>
        <p> This is the Home page. </p>
        <Link to='/about'>
          Go to About
        </Link>
      </div>
    )
  }
}
