import React, { useReducer } from 'react'

const initialState = { count: 0 }

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'reset':
      return { count: 0 }
    default:
      return state
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ fontSize: '36px' }}>Count: {state.count}</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button onClick={() => dispatch({ type: 'decrement' })}>
          - Decrement
        </button>
        <button onClick={() => dispatch({ type: 'reset' })}>🔄 Reset</button>
        <button onClick={() => dispatch({ type: 'increment' })}>
          + Increment
        </button>
      </div>
    </div>
  )
}

export default Counter
