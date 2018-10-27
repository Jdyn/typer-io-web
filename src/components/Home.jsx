import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Loader from './Loader'

const defaultProps = {
  page: null,
  totalResults: null,
  totalPages: null,
}

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  hasErrored: PropTypes.bool.isRequired,
  page: PropTypes.number,
  totalResults: PropTypes.number,
  totalPages: PropTypes.number,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
}

class Home extends Component {
  componentWillMount() {
    this.props.fetchMovies('super')
  }
  
  render() {
    const { movies, isLoading, totalResults } = this.props
    return (
      <div>
        <Link to='/about'> Go to About -> </Link>
        <h3>{totalResults} Results </h3>
        {movies.map(movie => (
          <div key={movie.id}>{movie.title}</div>
        ))}
      <Loader isLoading={isLoading} />
      </div>
    )
  }
}

Home.propTypes = propTypes
Home.defaultProps = defaultProps

export default Home