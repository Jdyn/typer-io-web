import { actions } from "../actions/MatchHistoryActions";

const initialState = {
  matches: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SAVE_MATCH:
      return {
        ...state,
        matches: [action.payload, ...state.matches]
      };
    case actions.DELETE_MATCH:
    return {
      ...state,
      matches: deleteMatch(state.matches, action.index)
    }
    default:
      return state;
  }
};

const deleteMatch = (matches, index) => {
  if (matches) {
    let copy = [...matches]
    copy.splice(index, 1)
    return copy
  }
}
