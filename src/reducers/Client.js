import types from "../actions/types/ClientTypes";

const initialState = {
  id: null,
  username: null,
  isInRoom: false,
  socket: {
    id: null,
    io: null, // The actual Socket.
    pending: false,
    connected: false,
    errored: false,
    error: null
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_CLIENT:
      return {
        ...state,
        ...action.object
      };
    default:
      return state;
  }
};
