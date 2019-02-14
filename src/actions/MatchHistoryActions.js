import keyMirror from "../lib/keyMirror";

export const actions = keyMirror("SAVE_MATCH", "DELETE_MATCH");

export const saveMatch = payload => {
    console.log(payload)
    return {
        type: actions.SAVE_MATCH,
        payload: {
            title: "test",
            place: "1st",
            wpm: payload.wpm
        }
    }
};
