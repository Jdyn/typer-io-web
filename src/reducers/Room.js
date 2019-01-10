import types from "../actions/types/ClientTypes";

const initialState = {
  id: null,
  username: null,
  isInRoom: false,
  socket: {
    pending: false,
    connected: false,
    errored: false,
    error: null
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ON_CONNECTION":
      return {
        ...state,
        ...action.payload.room
      };

    default:
      return state;
  }
};
