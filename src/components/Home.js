import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasErrored: PropTypes.bool.isRequired
}

class Home extends Component {
  componentWillMount() {
    console.log(this.props.inProgress)
    this.props.fetchMovies('super')
  }
  
  render() {
    const { movies, isLoading } = this.props
    if (isLoading) {
      return <div> Loading Movies... </div>
    }
    return (
      <div>
        <Link to='/about'>
          Go to About 
        </Link>
        {movies.map(movie => (
          <div>{movie.title}</div>
        ))}
      </div>
    )
  }
}

Home.propTypes = propTypes
export default Home