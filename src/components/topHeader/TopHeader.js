import React, { Component } from 'react'
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { getMovies } from '../../actions/MoviesActions'

class TopHeader extends Component {

  componentDidMount() {
    this.props.fetchMovies()
  }

  render() {
    return (
      <div className="header">
        <div className="header-content">
          {console.log(this.props)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movies,
    hasErrored: state.moviesHasErrored,
    isLoading: state.moviesIsLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
      fetchMovies: () => dispatch(getMovies())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopHeader)