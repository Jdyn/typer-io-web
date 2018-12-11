import * as types from "../constants/ActionTypes";

const initialState = {
  overview: {
    state: [[]],
    currentLetter: {
      letter: "",
      cords: []
    },
    stats: {
      clients: []
    }
  },
  editor: {
    correctWords: [],
    remainingWords: []
  }
};

export default (state = initalState, action) => {
    
}