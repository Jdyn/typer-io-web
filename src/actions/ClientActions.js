import types from "./types/ClientTypes";
import io from "socket.io-client";

let socket

export const init = (serverURL, dispatch) => {
    socket = io(serverURL)

    
}

export const updateClient = object => ({
  type: types.UPDATE_CLIENT,
  object
});
