import { FETCH_MOVIES } from '../constants/ActionTypes'

const initialState = {
  movies: [
    {
      name: "movie 1",
      id: 1
    },
    {
      name: " movie 2",
      id: 2
    }
  ]
}

export default function movies(state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIES:
      return state
    default:
      return state
  }
}