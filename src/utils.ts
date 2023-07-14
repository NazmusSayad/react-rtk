export function generateReducers(slices: any[]) {
  const reducers: any = {}
  slices.forEach((slice) => {
    reducers[slice.name] = slice.reducer
  })
  return reducers
}

export function generateActions(dispatch: any, slices: any[]) {
  function wrapActions(actions: any) {
    const newActions: any = {}
    for (let key in actions) {
      newActions[key] = (...args: any[]) => {
        dispatch(actions[key](...args))
      }
    }
    return newActions
  }

  const actions: any = {}
  slices.forEach((slice) => {
    actions[slice.name] = wrapActions(slice.actions)
  })
  return actions
}
