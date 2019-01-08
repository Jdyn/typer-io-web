import types from "./types/ClientTypes";

let socket

const init = (store, serverURL) => {
    socket = io(serverURL)

    Object.keys()
}

export const updateClient = object => ({
  type: types.UPDATE_CLIENT,
  object
});
