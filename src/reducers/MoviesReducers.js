import { FETCH_MOVIES } from '../constants/ActionTypes'

const initialState = []

export default function movies(state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIES:
      return state
    default:
      return state
  }
}