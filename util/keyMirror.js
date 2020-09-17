/**
 * Return an object of key:key. Used to quick generate an object of
 * action constants for Redux.
 *
 * @example
 * const actions = keyMirror('REQUEST', 'SUCCESS', 'FAILURE')
 * console.log(actions.REQUEST) // => 'REQUEST'
 *
 * @param {String} ...keys
 * @return {Object}
 */
const keyMirror = (...keys) => {
  return keys.reduce((obj, key) => ({ ...obj, [key]: key }), {});
};

export default keyMirror;