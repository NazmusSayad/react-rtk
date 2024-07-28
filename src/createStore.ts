import { useSelector } from 'react-redux'
import { Slice, configureStore } from '@reduxjs/toolkit'
import { getValueUsingPath } from './utils'
import { CustomReducersToActions } from './createSlice'
import { EntriesToObject, ObjectPath, ObjectPathValue } from './types'

export default function <TSlices extends Slice[]>(...slices: TSlices) {
  return createAdvancedStore({}, ...slices)
}

export function createAdvancedStore<
  TSlices extends Slice[],
  TConfig extends Record<string, unknown>
>(config: TConfig, ...slices: TSlices) {
  type Reducers = EntriesToObject<{
    [I in keyof TSlices]: [TSlices[I]['name'], TSlices[I]['reducer']]
  }>

  type State = {
    [I in keyof Reducers]: ReturnType<Reducers[I]>
  }

  type Actions = EntriesToObject<{
    [I in keyof TSlices]: [
      TSlices[I]['name'],
      CustomReducersToActions<TSlices[I]['actions']>
    ]
  }>

  const reducer = generateReducers(slices) as Reducers
  const store = configureStore<State>({ ...config, reducer })
  const actions = generateActions(store.dispatch, slices) as Actions

  function useStore<T extends ((state: State) => unknown) | ObjectPath<State>>(
    path: T
  ) {
    const selectorFn =
      typeof path === 'string'
        ? (state: any) => getValueUsingPath(state, path)
        : path

    type Value = T extends ObjectPath<State>
      ? ObjectPathValue<State, T>
      : T extends (...args: any) => infer ReturnType
      ? ReturnType
      : never

    return useSelector(selectorFn as any) as Value
  }

  return [store, useStore, actions] as const
}

function generateReducers(slices: Slice[]) {
  const reducers: Record<string, any> = {}
  slices.forEach((slice) => {
    reducers[slice.name] = slice.reducer
  })
  return reducers
}

function generateActions(dispatch: any, slices: Slice[]) {
  function wrapActions(actions: any) {
    const newActions: Record<string, any> = {}
    for (let key in actions) {
      newActions[key] = (...args: any[]) => {
        return dispatch(actions[key](args))
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
