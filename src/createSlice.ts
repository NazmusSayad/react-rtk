import {
  Draft,
  createSlice,
  CaseReducer,
  PayloadAction,
  SliceSelectors,
  SliceCaseReducers,
  CreateSliceOptions,
  ValidateSliceCaseReducers,
} from '@reduxjs/toolkit'
import { PartialObjectByKeys, Prettify, RemoveFirstElement } from './types'

export default function <
  State,
  Name extends string,
  Selectors extends SliceSelectors<State>,
  ActionReducers extends CustomReducers<State>,
  CaseReducers extends SliceCaseReducers<State>,
  ReducerPath extends string = Name
>(
  name: Name,
  config: Prettify<
    PartialObjectByKeys<
      Omit<
        CreateSliceOptions<State, CaseReducers, Name, ReducerPath, Selectors>,
        'name'
      >,
      'reducers'
    > & { actions: ActionReducers }
  >
) {
  type ActionsCaseReducers = {
    [K in keyof ActionReducers]: CaseReducer<
      State,
      PayloadAction<RemoveFirstElement<Parameters<ActionReducers[K]>>>
    >
  }

  type CombinedCaseReducers = {
    [K in keyof CaseReducer]: K extends keyof ActionsCaseReducers
      ? never
      : CaseReducers[K]
  } & ActionsCaseReducers

  const actionsToReducers = {} as ActionsCaseReducers
  for (let key in config.actions) {
    actionsToReducers[key] = function (state: Draft<State>, action) {
      return config.actions[key](state, ...action.payload)
    }
  }

  const sliceConfig = {
    ...config,
    reducers: {
      ...config.reducers,
      ...actionsToReducers,
    } as unknown as ValidateSliceCaseReducers<State, CombinedCaseReducers>,
    name,
  }

  return createSlice(sliceConfig)
}

export type CustomReducers<State = any> = Record<
  string,
  (state: Draft<State>, ...args: any[]) => any
>

export type CustomReducersToActions<Reducer extends CustomReducers> = {
  [K in keyof Reducer]: (...args: Parameters<Reducer[K]>[0]) => {
    type: string
    payload: Parameters<Reducer[K]>[0]
  }
}
