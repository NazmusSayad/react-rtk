import {
  createSlice,
  SliceCaseReducers,
  CreateSliceOptions,
  CaseReducer,
  PayloadAction,
  ValidateSliceCaseReducers,
} from '@reduxjs/toolkit'
import { CustomReducers } from './types'

export default function <
  State,
  Reducers extends CustomReducers<State>,
  Name extends string = string
>(
  name: Name,
  config: Omit<
    CreateSliceOptions<State, SliceCaseReducers<State>, Name>,
    'name' | 'reducers'
  > & { reducers: Reducers }
) {
  const usable: any = {}
  for (let key in config.reducers) {
    usable[key] = (state: any, { payload }: any) => {
      return config.reducers[key](state, payload)
    }
  }

  const reducers = usable as ValidateSliceCaseReducers<
    State,
    {
      [K in keyof Reducers]: CaseReducer<
        State,
        PayloadAction<Parameters<Reducers[K]>[1]>
      >
    }
  >

  return createSlice({
    ...config,
    reducers,
    name,
  })
}
