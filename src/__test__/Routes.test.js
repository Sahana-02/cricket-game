import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from '../Routes/routes'

describe('Routes', () => {
  test('renders HomePage component for / route', () => {
    const { getByText } = render(
      <Router>
        <Routes />
      </Router>
    )
    expect(getByText(/Welcome to Cricket Game/i)).toBeDefined()
  })

  test('renders CricketContainer component for /playGame route', () => {
    const { getByText } = render(
      <Router initialEntries={['/playGame']}>
        <Routes />
      </Router>
    )
    expect(getByText(/Cricket Game/i)).toBeDefined()
  })

  test('renders HomePage component for unknown routes', () => {
    const { getByText } = render(
      <Router initialEntries={['/unknown']}>
        <Routes />
      </Router>
    )

	expect(getByText(/Welcome to Cricket Game/i)).toBeDefined()
  })
})
