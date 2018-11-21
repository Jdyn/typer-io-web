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

// const mapStateToProps = state => {
//   return {
//     hasErrored: state.movies.hasErrored,
//     isLoading: state.movies.isLoading,
//     movies: state.movies.movies,
//     page: state.movies.page,
//     totalResults: state.movies.totalResults,
//     totalPages: state.movies.totalPages,
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//       fetchMovies: () => dispatch(fetchMovies('super'))
//   };
// };

export default HomeContainer//connect(mapStateToProps, mapDispatchToProps)(HomeContainer)


