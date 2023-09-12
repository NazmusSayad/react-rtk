export function generateReducers(slices: any[]) {
  const reducers: Record<string, any> = {}
  slices.forEach((slice) => {
    reducers[slice.name] = slice.reducer
  })
  return reducers
}

export function generateActions(dispatch: any, slices: any[]) {
  function wrapActions(actions: any) {
    const newActions: Record<string, any> = {}
    for (let key in actions) {
      newActions[key] = (...args: any[]) => {
        return dispatch(actions[key](...args))
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
