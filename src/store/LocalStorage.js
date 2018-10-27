export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    console.log(serializedState)
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch(error) {
    return undefined
  }
}

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch(error) {
    // do something (maybe log etc)
  }
}