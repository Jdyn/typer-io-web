import { actions } from "../actions/MatchHistoryActions";

const initialState = {
  matches: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SAVE_MATCH:
    return {
      ...state,
      matches: [...state.matches, action.payload]
    }
    default: return state
  }
};
