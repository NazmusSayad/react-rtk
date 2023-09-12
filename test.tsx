/* import { createSlice, createStore } from './src/index'

const slice1 = createSlice('main', {
  initialState: {
    message: 'Hello world!',
  },
  reducers: {
    updateMessage(state, payload: string) {
      state.message = payload
    },
  },
})

const slice2 = createSlice('data', {
  initialState: {
    score: 0,
  },
  reducers: {
    increment(state, payload: number = 1) {
      state.score += payload
    },
    decrement(state, payload: number = 1) {
      state.score -= payload
    },
  },
})

const [store, useStore, actions] = createStore(slice1, slice2)

export default function App() {
  const message = useStore((state) => state.main.message)
  const score = useStore((state) => state.data.score)

  return (
    <div>
      <h1>{message}</h1>

      <div>
        <button onClick={() => actions.main.updateMessage('Hey!')}>
          Change Message
        </button>
      </div>

      <h2>{score}</h2>
      <div>
        <button onClick={() => actions.data.increment()}>Increment</button>
        <button onClick={() => actions.data.decrement()}>Decrement</button>
      </div>
    </div>
  )
}
 */