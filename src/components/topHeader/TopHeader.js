import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class TopHeader extends Component {
  render() {
    return (
      <div className="header">
        <div className="header-content">
          <Link to='/'> <h1>Flix Clips</h1> </Link>
        </div>
      </div>
    )
  }
}

export default TopHeader