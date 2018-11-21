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

  export const establishSocketSuccess = (data, socket) => ({
      type: types.ESTABLISH_SOCKET_SUCCESS,
      data,
      socket
  })

export const establishSocket = (serverUrl, username) => (dispatch, getState) => {
    dispatch(establishSocketRequest(true))
    const socket = io(serverUrl)

    socket.emit('register', {name: username})

    // reserved Socket.io string
    socket.on('connect_error', () => {
        dispatch(establishSocketErrored(true))
        socket.close();
    });

    // reserved Socket.io string
    socket.on('connect', () => {
        console.log(socket.id)
        socket.on('connected', (data) => {
            console.log(data)
            dispatch(establishSocketSuccess(data, socket))
        })
    })
}