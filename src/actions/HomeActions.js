import io from 'socket.io-client'
import * as types from '../constants/ActionTypes'

export const establishSocketRequest = inProgress => ({
    type: types.ESTABLISH_SOCKET_REQUEST,
    inProgress
})

export const establishSocketErrored = hasErrored => ({
    type: types.ESTABLISH_SOCKET_ERRORED,
    hasErrored
  })

  export const establishSocketSuccess = (client) => ({
      type: types.ESTABLISH_SOCKET_SUCCESS,
      client,
      socket
  })

export const establishSocket = (socket) => (dispatch, getState) => {
    dispatch(establishSocketRequest(true))
    // reserved Socket.io param
    socket.on('connect_error', () => {
        dispatch(establishSocketErrored(true))
        socket.close();
    });

    // reserved Socket.io param
    socket.on('connect', () => {
        socket.on('connected', (client) => {
            dispatch(establishSocketSuccess(client))
        })
    })
}

export const registerSocketRequest = inProgress => ({
    type: types.ESTABLISH_SOCKET_REQUEST,
    inProgress
})

export const registerSocketErrored = hasErrored => ({
    type: types.REGISTER_SOCKET_ERROR,
    hasErrored
})

export const registerSocketSuccess= (data, socket) => ({
    type: types.REGISTER_SOCKET_SUCCESS,
    data,
    socket
})

export const registerSocket = (serverUrl, username) => dispatch => {
    const socket = io(serverUrl)

    socket.emit('register', username, data => {
        console.log(data)
        dispatch(registerSocketSuccess(data, socket))
    })
}