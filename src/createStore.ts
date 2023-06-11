import { configureStore } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { EntriesToObject, SliceKey } from './types'
import { sliceKey } from './config'

export default <T extends any[]>(...slices: T) => {
  type Reducers = EntriesToObject<{
    [I in keyof T]: [T[I][SliceKey]['name'], T[I][SliceKey]['reducer']]
  }>

  type State = {
    [I in keyof Reducers]: ReturnType<Reducers[I]>
  }

  const reducer: Reducers = Object.fromEntries(
    slices.map((slice) => [slice[sliceKey].name, slice[sliceKey].reducer])
  )

  const store = configureStore<State>({ reducer })
  function useStore<T>(selector: (state: State) => T) {
    return useSelector(selector)
  }

  return [store, useStore] as const
}
