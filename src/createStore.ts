import { configureStore } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { EntriesToObject } from './types'
import { generateReducers, generateActions } from './utils'

export default <T extends any[]>(...slices: T) => {
  type Reducers = EntriesToObject<{
    [I in keyof T]: [T[I]['name'], T[I]['reducer']]
  }>
  type Actions = EntriesToObject<{
    [I in keyof T]: [T[I]['name'], T[I]['actions']]
  }>
  type State = {
    [I in keyof Reducers]: ReturnType<Reducers[I]>
  }

  const reducer: Reducers = generateReducers(slices)
  const store = configureStore<State>({ reducer })

  const actions: Actions = generateActions(store.dispatch, slices)
  function useStore<T>(selector: (state: State) => T) {
    return useSelector(selector)
  }

  return [store, useStore, actions] as const
}
