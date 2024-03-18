import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Cricket from '../pages/Cricket'
import { Provider } from 'react-redux'
import store from '../redux/store'

test('renders tabs correctly', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Cricket />
    </Provider>
  )

  const playGameTab = getByText('Play Game')
  const superOverTab = getByText('Super Over')

  expect(playGameTab).toBeInTheDocument()
  expect(superOverTab).toBeInTheDocument()
})
