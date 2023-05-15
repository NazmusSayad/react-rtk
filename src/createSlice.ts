import {
  CreateSliceOptions,
  SliceCaseReducers,
  createSlice,
} from '@reduxjs/toolkit'
import { Modify } from './types'

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
  slice.actions['__slice__'] = slice

  type Output = Modify<typeof slice.actions, { __slice__: typeof slice }>
  return slice.actions as Output
}
