import { configureStore } from '@reduxjs/toolkit'
import { type } from 'os'
import { useSelector } from 'react-redux'
import { UnionToIntersection } from './types'

function ObjectFromEntries(iter) {
  const obj = {}

  for (const pair of iter) {
    if (Object(pair) !== pair) {
      throw new TypeError('iterable for fromEntries should yield objects')
    }

    // Consistency with Map: contract is that entry has "0" and "1" keys, not
    // that it is an array or iterable.

    const { '0': key, '1': val } = pair

    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      writable: true,
      value: val,
    })
  }

  return obj
}



export default <T extends any[]>(
  ...slices: T
): [typeof store, typeof useStore, typeof test] => {
  type Test = {
    [I in keyof T]: {
      [T[I]['__slice__']['name']]: T[I]['__slice__']['reducer']
    }
  }

  const entries = slices.map((a) => [
    a.__slice__.name,
    a.__slice__.reducer,
  ]) as Test
  const test = ObjectFromEntries(entries) as Test[number]

  const reducer = Object.fromEntries(
    slices.map((a) => [a.__slice__.name, a.__slice__.reducer])
  )

  // slices.forEach((slice) => {
  //   const rawSlice = slice.__slice__
  //   reducer[rawSlice.name] = rawSlice.reducer
  // })

  const store = configureStore({ reducer })
  type Store = ReturnType<typeof store.getState>

  function useStore<T>(selector: (state: Store) => T) {
    return useSelector(selector)
  }

  return [store, useStore, test]
}
