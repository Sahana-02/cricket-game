import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import Match from '../pages/Match'
import store from '../redux/store'


test('renders Match component correctly', () => {
  const { getByText, getByLabelText } = render(
    <Provider store={store}>
      <Match />
    </Provider>
  )


  expect(getByText('INDIA V/S AUSTRALIA')).toBeInTheDocument()
  expect(getByText('India won the toss and choose to ball')).toBeInTheDocument()
  expect(getByLabelText('Target:')).toBeInTheDocument()
})

test('updates target value when input changes', () => {
  const { getByLabelText } = render(
    <Provider store={store}>
      <Match />
    </Provider>
  )

  const targetInput = getByLabelText('Target:')
  fireEvent.change(targetInput, { target: { value: '150' } })

  expect(targetInput.value).toBe('150')
})
