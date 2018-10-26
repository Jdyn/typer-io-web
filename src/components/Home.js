import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Loader from './Loader'

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  hasErrored: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  totalResults: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  movies: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

class Home extends Component {
  componentWillMount() {
    this.props.fetchMovies('super')
  }
  
  render() {
    const { movies, isLoading } = this.props
    return (
      <div>
        <Link to='/about'> Go to About </Link>
        {movies.map(movie => (
          <div>{movie.title}</div>
        ))}
      <Loader isLoading={isLoading} />
      </div>
    )
  }
}

Home.propTypes = propTypes
export default Home