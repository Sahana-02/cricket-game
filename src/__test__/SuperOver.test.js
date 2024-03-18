import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import SuperOver from '../pages/SuperOver'
import store from '../redux/store'

test('renders SuperOver component correctly', () => {
  const { getByText, getByLabelText } = render(
    <Provider store={store}>
      <SuperOver />
    </Provider>
  )

  expect(getByText('INDIA V/S AUSTRALIA Super Over'.trim())).toBeInTheDocument()
  expect(getByText('India is Batting')).toBeInTheDocument()
  expect(getByLabelText('Target:')).toBeInTheDocument()
})

test('updates target value when input changes', () => {
  const { getByLabelText } = render(
    <Provider store={store}>
      <SuperOver />
    </Provider>
  )
  
  const targetInput = getByLabelText('Target:')
  fireEvent.change(targetInput, { target: { value: '150' } })

  expect(targetInput.value).toBe('150')
})
