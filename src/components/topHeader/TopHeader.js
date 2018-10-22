import React, { Component } from 'react'
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

class TopHeader extends Component {
  render() {
    const { movies } = this.props

    return (
      <div className="header">
        <div className="header-content">
        
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    movies: state.movies.movies
  }
}

export default connect(mapStateToProps)(TopHeader)