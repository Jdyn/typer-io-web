import React, { Component } from 'react'
import Home from '../components/Home'
import { connect } from 'react-redux'
import { fetchMovies } from '../actions/MoviesActions'

class HomeContainer extends Component {
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
    movies: state.movies.movies,
    hasErrored: state.movies.hasErrored,
    isLoading: state.movies.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
      fetchMovies: () => dispatch(fetchMovies('super'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)


