import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import { connect } from 'react-redux'
// import { fetchMoviesBySearch } from '../actions/MoviesActions'

export default class Home extends Component {
  
  componentWillMount() {
    
  }
  
  render() {
    const { inProgress, movies } = this.props
    console.log(this.props.inProgress, "component will mount")
    if (inProgress) {
      return <div>Component is loading</div>
    }
    return (
      <div>
        {/* {this.movies.map((movie) => (<p>{movie.title}</p>))} */}
        <Link to='/about'>
          Go to About 
        </Link>
      </div>
    )
  }
}
