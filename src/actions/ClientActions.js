import types from "./types/ClientTypes";

export const updateClient = payload => ({
  type: types.UPDATE_CLIENT,
  payload
});
