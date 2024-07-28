import React from 'react'
import { actions, useStore } from './store'

export default function App() {
  const score = useStore((state) => state.data.score)
  const message = useStore((state) => state.main.message)
  const messageText = useStore('data.score')

  return (
    <div>
      <h1>{message}</h1>

      <button
        onClick={() => {
          // actions.main.reset('Hello')
          actions.main.test(1, 2, 3)
        }}
      >
        TEST
      </button>

      <div>
        <button onClick={() => actions.main.updateMessage('Hey!')}>
          Change Message
        </button>
      </div>

      <h2>{score}</h2>
      <div>
        <button onClick={() => console.log(actions.data.increment(1).payload)}>
          Increment
        </button>
        <button onClick={() => actions.data.decrement(1)}>Decrement</button>
      </div>
    </div>
  )
}
