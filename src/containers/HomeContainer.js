import React, { Component } from 'react'
import Home from '../components/Home'
import { connect } from 'react-redux'
import { fetchMoviesBySearch } from '../actions/MoviesActions'

class HomeContainer extends Component {
  componentWillMount() {
    this.props.fetchMovies()
  }
  
  render() {
    return (
      <div>
        <Home {...this.props}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movies.movies.results,
    hasErrored: state.movies.hasErrored,
    inProgress: state.request.inProgress
  }
}

const mapDispatchToProps = dispatch => {
  return {
      fetchMovies: () => dispatch(fetchMoviesBySearch('super'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)


