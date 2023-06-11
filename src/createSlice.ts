import {
  CreateSliceOptions,
  SliceCaseReducers,
  createSlice,
} from '@reduxjs/toolkit'
import { Modify } from './types'
import { sliceKey } from './config'

export default function <
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string = string
>(
  name: Name,
  initialState: State | (() => State),
  reducers: CreateSliceOptions<State, CaseReducers, Name>['reducers']
) {
  const slice = createSlice({ name, initialState, reducers })

  // @ts-ignore
  slice.actions[sliceKey] = slice

  type Output = Modify<typeof slice.actions, { [sliceKey]: typeof slice }>
  return slice.actions as Output
}
