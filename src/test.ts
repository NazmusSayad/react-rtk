import { createSlice, createStore } from './index'

const slice1 = createSlice('name', {
  initialState: { world: 'value' },
  reducers: { hack() {} },
})
const slice2 = createSlice('data', {
  initialState: { hello: 'hello' },
  reducers: { hack2(state, boom: string) {} },
})

const [store, useStore, actions] = createStore(slice1, slice2)
actions.data.hack2('234234')
