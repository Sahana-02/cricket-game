import { useHistory } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Header from './Header'

const HomePage = () => {
  const history = useHistory()

  const handlePredictClick = () => {
    history.push('/playGame')
  }

  return (
    <div className='bg-light'>
      <Header />
      <Container className='py-5'>
        <Row className='justify-content-center'>
          <Col md={6}>
            <h1 className='text-center mb-4'>Welcome to Cricket Game</h1>
            <p className='text-center mb-4'>
              Experience the thrill of cricket!
            </p>
            <div className='text-center'>
              <Button variant='primary' onClick={handlePredictClick}>
                Play Game
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default HomePage
