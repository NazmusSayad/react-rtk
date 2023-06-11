import { configureStore } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { EntriesToObject, SliceKey } from './types'
import { sliceKey } from './config'

export default <T extends any[]>(...slices: T) => {
  type Reducer = EntriesToObject<{
    [I in keyof T]: [T[I][SliceKey]['name'], T[I][SliceKey]]
  }>

  type State = {
    [K in keyof Reducer]: ReturnType<Reducer[K]['getInitialState']>
  }

  const reducer: Reducer = Object.fromEntries(
    slices.map((slice) => [slice[sliceKey].name, slice[sliceKey]])
  )

  const store = configureStore<State>({ reducer })
  function useStore<T>(selector: (state: State) => T) {
    return useSelector(selector)
  }

  return [store, useStore] as const
}
