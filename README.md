# react-rtk

**react-rtk** is a React Redux Toolkit-based package that simplifies state management in React applications. It provides a convenient way to define and manage slices of your application's state using RTK's conventions.

## Installation

You can install **react-rtk** via npm or yarn:

```sh
npm install react-rtk
# or
yarn add react-rtk
```

## Usage

### Creating Slices

To start using **react-rtk**, create slices of your application's state using the `createSlice` function from the package. A slice represents a specific part of your state and includes an initial state and a set of reducers to modify that state.

Example:

```javascript
import { createSlice, createStore } from 'react-rtk'

const slice1 = createSlice('main', {
  initialState: {
    message: 'Hello world!',
  },
  reducers: {
    updateMessage(state, payload) {
      state.message = payload
    },
  },
})

const slice2 = createSlice('data', {
  initialState: {
    score: 0,
  },
  reducers: {
    increment(state, payload = 1) {
      state.score += payload
    },
    decrement(state, payload = 1) {
      state.score -= payload
    },
  },
})
```

### Creating the Store

Combine the created slices using the `createStore` function to create a Redux store for your application:

```javascript
const [store, useStore, actions] = createStore(slice1, slice2)
```

The `store` object represents your Redux store, `useStore` is a hook to access the store's state in your components, and `actions` contains action creators for the defined reducers.

### Using State in Components

Use the `useStore` hook to access state properties from the store in your React components:

```javascript
import React from 'react'
import { useStore, actions } from './store'

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
```

## Conclusion

**react-rtk** simplifies Redux state management in your React application by following the conventions and patterns of React Redux Toolkit. It reduces boilerplate code and makes it easier to organize your application's state and actions.

Feel free to explore more complex use cases and configurations based on your specific application needs.
