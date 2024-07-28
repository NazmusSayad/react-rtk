import { createSlice, createStore } from '../src/index'

const mainSlice = createSlice('main', {
  initialState: {
    message: 'Hello world!',
  },

  actions: {
    updateMessage(state, payload: string) {
      state.message = payload
    },

    test(state, param1, param2, param3) {
      console.log('!!Test', param1, param2, param3)
    },
  },
})

const dataSlice = createSlice('data', {
  initialState: {
    score: 0,
  },
  actions: {
    increment(state, payload: number = 1) {
      state.score += payload
    },
    decrement(state, payload: number = 1) {
      state.score -= payload
    },

    test(state) {},
  },

  reducers: {},
})

export const [store, useStore, actions] = createStore(mainSlice, dataSlice)

// const testFn = actions.main.test
// const resetFn = actions.main.reset
// type TestParams = Parameters<typeof testFn>
// type ResetParams = Parameters<typeof resetFn>
// type TestReturn = ReturnType<typeof testFn>
// type ResetReturn = ReturnType<typeof resetFn>
