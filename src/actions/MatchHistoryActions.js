import keyMirror from "../lib/keyMirror";

export const actions = keyMirror("SAVE_MATCH", "DELETE_MATCH");

export const saveMatch = (payload, snippet) => {
  return {
    type: actions.SAVE_MATCH,
    payload: {
      title: snippet.title,
      place: "1st",
      wpm: payload.wpm,
      date: Date.now()
    }
  };
};

export const deleteMatch = index => {
  return {
    type: actions.DELETE_MATCH,
    index
  };
};
