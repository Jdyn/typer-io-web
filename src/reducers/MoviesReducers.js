import { FETCH_MOVIES } from '../constants/ActionTypes'

const intialState = []

export default function songs(state = intialState, action) {
  switch (action.type) {
    case FETCH_MOVIES:
      return state
    default:
      return state
  }
}