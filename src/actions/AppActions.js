import * as types from '../constants/ActionTypes'
import io from 'socket.io-client'

export const initClient = username => ({
    type: types.INIT_CLIENT,
    username
})