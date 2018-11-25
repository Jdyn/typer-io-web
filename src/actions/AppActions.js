import * as types from '../constants/ActionTypes'

export const initClient = username => ({
    type: types.INIT_CLIENT,
    username
})