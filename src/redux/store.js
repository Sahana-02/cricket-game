import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducer'

const store = configureStore({
  reducer
})

export default store

// import { createStore } from 'redux'
// import reducer from './reducer'

// const store = createStore(reducer)

// export default store
