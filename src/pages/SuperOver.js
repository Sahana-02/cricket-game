import {
  Col,
  Container,
  Row,
  Image,
  Form,
  Button,
  Modal
} from 'react-bootstrap'
import { useState, useContext } from 'react'
import { CommentaryContext } from '../context/CommentaryContext'
import SuperOverImg from '../assets/images/SuperOver.png'
import {
  updateRuns,
  updateTarget,
  updateWickets,
  updateOvers,
  updateBalls,
  updateWinner
} from '../redux/action'
import { useDispatch, useSelector } from 'react-redux'

export default function SuperOver () {
  const dispatch = useDispatch()
  const [batting, setBatting] = useState('')
  const [shotType, setShotType] = useState('')
  const targetValue = useSelector((state) => state.target)
  const overs = useSelector((state) => state.overs)
  const runs = useSelector((state) => state.runs)
  const wickets = useSelector((state) => state.wickets)
  const target = useSelector((state) => state.target)
  const balls = useSelector((state) => state.balls)
  const { commentary, setCommentary } = useContext(CommentaryContext)
  const [showSuccessModal, setSuccessModal] = useState(false)
  const winner = useSelector((state) => state.winner)
  const ballingCards = [
    { value: '', label: 'Select Ball Type' },
    { value: 'bouncer', label: 'Bouncer' },
    { value: 'outswinger', label: 'Outswinger' },
    { value: 'offcutter', label: 'Off Cutter' },
    { value: 'yorker', label: 'Yorker' },
    { value: 'offbreak', label: 'Off Break' },
    { value: 'inswinger', label: 'Inswinger' },
    { value: 'legcutter', label: 'Leg Cutter' },
    { value: 'slowballer', label: 'Slower Ball' },
    { value: 'pace', label: 'Pace' },
    { value: 'doosra', label: 'Doosra' }
  ]
  const [ballType, setRandomBallingType] = useState('')
  const battingCards = useSelector((state) => state.filteredBattingCards)
  const shotTimings = useSelector((state) => state.shotTimings)
  const handleTargetChange = (e) => {
    dispatch(updateTarget(parseInt(e.target.value, 10)))
    dispatch(updateOvers(parseInt(1, 10)))
  }

  const handleBattingCard = (e) => {
    setBatting(e.target.value)
    pickRandomBallingType()
  }

  const pickRandomBallingType = () => {
    const randomIndex =
      Math.floor(Math.random() * (ballingCards.length - 1)) + 1
    const selectedBallingType = ballingCards[randomIndex].value
    setRandomBallingType(selectedBallingType)
  }

  const handleSubmit = (e) => {
    e?.preventDefault()
    const runsOptions = {
      early: [1, 'w'],
      good: [2, 3, 4],
      perfect: [4, 5, 6],
      late: [1, 'w']
    }
    const targetGiven = parseInt(targetValue, 10)
    const completedBalls = balls + 1
    dispatch(updateBalls(completedBalls))
    console.log('balls', balls)

    let currentRuns = 0
    let currentWickets = 0
    if (ballType || batting) {
      if (shotType in runsOptions) {
        const possibleRuns = runsOptions[shotType]
        currentRuns =
          possibleRuns[Math.floor(Math.random() * possibleRuns.length)]
      }
    }
    // updates wickets
    if (currentRuns === 'w') {
      currentWickets = wickets + 1
      dispatch(updateWickets(currentWickets))
    }
    dispatch(updateTarget(targetGiven))
    let updatedRuns = 0
    if (currentRuns !== 'w') {
      updatedRuns = runs + currentRuns
    }
    if (currentRuns !== 'w') {
      dispatch(updateRuns(updatedRuns))
    }

    const newCommentary = generateCommentary(currentRuns)
    setCommentary(newCommentary)
    if (newCommentary) {
      speechSynthesis.cancel()
      const cmtry = new SpeechSynthesisUtterance(newCommentary)
      speechSynthesis.speak(cmtry)
    }
    declareWinner(updatedRuns)
  }

  const declareWinner = (updatedRuns) => {
    if (updatedRuns >= target) {
      const winner = 'Australia'
      dispatch(updateWinner(winner))
    } else if (overs * 6 === balls || wickets === 10) {
      const winner = 'India'
      dispatch(updateWinner(winner))
      dispatch(updateWickets(0))
      dispatch(updateBalls(0))
      dispatch(updateWinner(''))
    }
  }

  const generateCommentary = (currentRuns) => {
    switch (true) {
      case currentRuns === 1:
        return `Sudhakar bowled ${ballType} ball, \n Craig played ${shotType} ${batting} shot \n Excellent line and length. - ${currentRuns} runs.`
      case currentRuns === 2:
        return `Sudhakar bowled ${ballType} ball, \n Craig played ${shotType} ${batting} shot \n Convert ones into twos. - ${currentRuns} runs.`
      case currentRuns === 3:
        return `Sudhakar bowled ${ballType} ball, \n Craig played ${shotType} ${batting} shot \n Excellent effort on the boundary. - ${currentRuns} runs.`
      case currentRuns === 4:
        return `Sudhakar bowled ${ballType} ball, \n Craig played ${shotType} ${batting} shot \n Great shot! Its a boundary. - ${currentRuns} runs.`
      case currentRuns === 5:
        return `Sudhakar bowled ${ballType} ball, \n Craig played ${shotType} ${batting} shot \n Wow! Batsman scored 5 runs! - ${currentRuns} runs.`
      case currentRuns === 6:
        return `Sudhakar bowled ${ballType} ball, \n Craig played ${shotType} ${batting} shot \n It’s a huge hit. - ${currentRuns} runs.`
      case currentRuns === 'w':
        return 'Oh no! Its a wicket. Craig lost a wicket'
      default:
        return null // or some default value
    }
  }

  const handleModalClose = () => {
    setSuccessModal(false)
  }

  return (
    <Container>
      <Modal show={showSuccessModal} onHide={() => setSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>WINNER</Modal.Title>
        </Modal.Header>
        <Modal.Body>{winner} won the match</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {winner && (
        <Row className='justify-content-center align-items-center mt-3'>
          <Col>
            <h1 style={{ textAlign: 'center', color: 'green' }}>
              {winner} Won the Match!
            </h1>
          </Col>
        </Row>
      )}
      <Row className='justify-content-center align-items-center'>
        <Col md={4}>
          <h1 className='mt-4' style={{ color: 'blue' }}>
            INDIA V/S AUSTRALIA Super Over
          </h1>
          <Image
            src={SuperOverImg}
            style={{ width: '300px', marginLeft: '10px' }}
            roundedCircle
          />
        </Col>
        <Col md={4}>
          <h4 className='mt-4' style={{ color: 'red' }}>
            India is Batting
          </h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='target'>
              <Form.Label>Target:</Form.Label>
              <Form.Control
                type='number'
                value={targetValue}
                onChange={handleTargetChange}
                min={0}
                max={250}
                isInvalid={targetValue < 0 || targetValue > 250}
                placeholder='Target must be between 0-250'
                required
              />
            </Form.Group>
            <Form.Group controlId='batting'>
              <Form.Label>Select Batting Cards:</Form.Label>
              <Form.Control
                as='select'
                value={batting}
                onChange={handleBattingCard}
                required
              >
                {battingCards.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='shotType'>
              <Form.Label>Shot Timings:</Form.Label>
              <Form.Control
                as='select'
                value={shotType}
                onChange={(e) => setShotType(e.target.value)}
              >
                {shotTimings.map((timing) => (
                  <option key={timing.value} value={timing.value}>
                    {timing.label}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <div className='mt-3'>
              <Button variant='primary' type='submit'>
                Predict
              </Button>
            </div>
          </Form>
        </Col>
        <Col md={4}>
          {commentary && <p className='mt-3'>Commentary: {commentary}</p>}
          <div>
            <p className='mt-3'>
              Total Runs: {runs}/{wickets}
            </p>
          </div>
          <div>
            <p className='mt-3'>
              {target - runs >= 0
                ? `${target - runs} runs to win from ${overs * 6 - balls} balls`
                : 'Target Achieved'}
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
