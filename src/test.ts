import { createSlice, createStore } from './index'

const slice1 = createSlice('name', { world: 'value' }, { hack() {} })
const slice2 = createSlice('data', { hello: 'hello' }, { hack2() {} })

const [store, useStore] = createStore(slice1, slice2)
