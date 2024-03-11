import {
  Col,
  Container,
  Row,
  Image,
  Form,
  Button,
  Modal
} from 'react-bootstrap'
import { useState, useEffect, useContext } from 'react'
import { CommentaryContext } from '../context/CommentaryContext'
import {
  updateRuns,
  updateBallingCards,
  updateFilteredBattingCards,
  updateShotTimings,
  updateTarget,
  updateOvers,
  updateWickets,
  updateBalls,
  updateWinner
} from '../redux/action'
import { useDispatch, useSelector } from 'react-redux'
import CricketImg from '../assets/images/cricket-black512.png'
export default function Match () {
  const dispatch = useDispatch()
  const [ballType, setBallType] = useState('')
  const [batting, setBatting] = useState('')
  const [shotType, setShotType] = useState('')
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

  const [filteredBattingCards, setFilteredBattingCards] = useState([])

  useEffect(() => {
    // Filter batting options based on balling type
    if (ballType === 'bouncer') {
      setFilteredBattingCards([
        { value: '', label: 'Select Batting' },
        { value: 'pull', label: 'Pull' },
        { value: 'uppercut', label: 'UpperCut' }
      ])
    } else if (ballType === 'outswinger') {
      setFilteredBattingCards([
        { value: '', label: 'Select Batting' },
        { value: 'coverdrive', label: 'CoverDrive' },
        { value: 'squarecut', label: 'SquareCut' },
        { value: 'straight', label: 'Straight' }
      ])
    } else if (ballType === 'offcutter') {
      setFilteredBattingCards([
        { value: '', label: 'Select Batting' },
        { value: 'straight', label: 'Straight' },
        { value: 'flick', label: 'Flick' },
        { value: 'leglance', label: 'Leglance' }
      ])
    } else if (ballType === 'yorker') {
      setFilteredBattingCards([
        { value: '', label: 'Select Batting' },
        { value: 'straight', label: 'Straight' },
        { value: 'scoop', label: 'Scoop' }
      ])
    } else if (ballType === 'offbreak') {
      setFilteredBattingCards([
        { value: '', label: 'Select Batting' },
        { value: 'sweep', label: 'Sweep' },
        { value: 'leglance', label: 'Leglance' },
        { value: 'flick', label: 'Flick' }
      ])
    } else if (ballType === 'inswinger') {
      setFilteredBattingCards([
        { value: '', label: 'Select Batting' },
        { value: 'straight', label: 'Straight' },
        { value: 'flick', label: 'Flick' },
        { value: 'longon', label: 'Long On' }
      ])
    } else if (ballType === 'legcutter') {
      setFilteredBattingCards([
        { value: '', label: 'Select Batting' },
        { value: 'squarecut', label: 'SquareCut' },
        { value: 'coverdrive', label: 'CoverDrive' }
      ])
    } else if (ballType === 'slowballer') {
      setFilteredBattingCards([
        { value: '', label: 'Select Batting' },
        { value: 'straight', label: 'Straight' },
        { value: 'coverdrive', label: 'CoverDrive' }
      ])
    } else if (ballType === 'pace') {
      setFilteredBattingCards([
        { value: '', label: 'Select Batting' },
        { value: 'straight', label: 'Straight' },
        { value: 'squarecut', label: 'SquareCut' },
        { value: 'coverdrive', label: 'CoverDrive' },
        { value: 'longon', label: 'Long On' }
      ])
    } else if (ballType === 'doosra') {
      setFilteredBattingCards([
        { value: '', label: 'Select Batting' },
        { value: 'sweep', label: 'Sweep' },
        { value: 'squarecut', label: 'SquareCut' }
      ])
    } else {
      // Default batting options
      setFilteredBattingCards([
        { value: '', label: 'Select Batting' },
        { value: 'straight', label: 'Straight' },
        { value: 'flick', label: 'Flick' },
        { value: 'leglance', label: 'Leglance' },
        { value: 'longon', label: 'Long On' },
        { value: 'squarecut', label: 'SquareCut' },
        { value: 'sweep', label: 'Sweep' },
        { value: 'coverdrive', label: 'CoverDrive' },
        { value: 'pull', label: 'Pull' },
        { value: 'scoop', label: 'Scoop' },
        { value: 'uppercut', label: 'UpperCut' }
      ])
    }
  }, [ballType])

  const shotTimings = [
    { value: '', label: 'Select Shot Time' },
    { value: 'early', label: 'Early' },
    { value: 'good', label: 'Good' },
    { value: 'perfect', label: 'Perfect' },
    { value: 'late', label: 'Late' }
  ]

  const handleTargetChange = (e) => {
    // Update targetValue whenever the input value changes
    dispatch(updateTarget(parseInt(e.target.value, 10)))
  }
  const handleOvers = (e) => {
    // Update targetValue whenever the input value changes
    dispatch(updateOvers(parseInt(e.target.value, 10)))
  }
  useEffect(() => {
    // Update ballingCards
    const updatedBallingCards = [...ballingCards]
    dispatch(updateBallingCards(updatedBallingCards))

    // Update filteredBattingCards
    const updatedFilteredBattingCards = [...filteredBattingCards]
    dispatch(updateFilteredBattingCards(updatedFilteredBattingCards))

    // Update shotTimings
    const updatedShotTimings = [...shotTimings]
    dispatch(updateShotTimings(updatedShotTimings))
  }, [dispatch, ballingCards, filteredBattingCards, shotTimings])

  const handleSubmit = (e) => {
    e?.preventDefault()
    const runsOptions = {
      early: [1, 'w'],
      good: [2, 3, 4],
      perfect: [4, 5, 6],
      late: [1, 'w']
    }
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
    let updatedRuns = 0
    if (currentRuns === 'w') {
      currentWickets = wickets + 1
      dispatch(updateWickets(currentWickets))
    } else {
      updatedRuns = runs + currentRuns
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
        return 'Excellent line and length.'
      case currentRuns === 2:
        return 'Convert ones into twos.'
      case currentRuns === 3:
        return 'Excellent effort on the boundary.'
      case currentRuns === 4:
        return 'Great shot! Its a boundary.'
      case currentRuns === 5:
        return 'Wow! Batsman scored 5 runs!'
      case currentRuns === 6:
        return 'It’s a huge hit.'
      case currentRuns === 'w':
        return 'Oh no! Its a wicket.'
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
            INDIA V/S AUSTRALIA
          </h1>
          <Image
            src={CricketImg}
            style={{ width: '300px', marginLeft: '10px' }}
            roundedCircle
          />
        </Col>
        <Col md={4}>
          <h4 className='mt-4' style={{ color: 'red' }}>
            India won the toss and choose to ball
          </h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='target'>
              <Form.Label>Target:</Form.Label>
              <Form.Control
                type='number'
                value={target}
                onChange={handleTargetChange}
                min={0}
                max={250}
                isInvalid={target < 0 || target > 250}
                placeholder='Target must be between 0-250'
                required
              />
            </Form.Group>
            <Form.Group controlId='overs'>
              <Form.Label>Overs:</Form.Label>
              <Form.Control
                type='number'
                value={overs}
                onChange={handleOvers}
                min={0}
                max={250}
                isInvalid={overs < 0 || overs > 10}
                placeholder='Overs must be between 1-10'
                required
              />
            </Form.Group>
            <Form.Group controlId='ballType'>
              <Form.Label>Select Balling cards:</Form.Label>
              <Form.Control
                as='select'
                value={ballType}
                onChange={(e) => setBallType(e.target.value)}
                required
              >
                {ballingCards.map((card) => (
                  <option key={card.value} value={card.value}>
                    {card.label}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='batting'>
              <Form.Label>Select Batting Cards:</Form.Label>
              <Form.Control
                as='select'
                value={batting}
                onChange={(e) => setBatting(e.target.value)}
                required
              >
                {filteredBattingCards.map((type) => (
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
                : 'Target Achived'}
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
