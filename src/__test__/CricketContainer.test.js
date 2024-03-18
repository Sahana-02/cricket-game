import React from 'react'
import { render } from '@testing-library/react'
import CricketContainer from '../components/CricketContainer'
import { Provider } from 'react-redux'
import store from '../redux/store'

test('renders without crashing', () => {
  render(
    <Provider store={store}>
      <CricketContainer />
    </Provider>
  )
})

