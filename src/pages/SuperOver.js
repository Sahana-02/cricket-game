import { Col, Container, Row, Image, Form, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
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
import cricketData from '../assets/cricketData/cricketData.json'
import { commentsObj } from '../utils/comments'
import { declareWinner } from '../utils/winner'
import { runsOptions } from '../utils/runs'

const SuperOver = () => {
  const dispatch = useDispatch()
  const [batting, setBatting] = useState('')
  const [shotType, setShotType] = useState('')
  const targetValue = useSelector((state) => state.target)
  const overs = useSelector((state) => state.overs)
  const runs = useSelector((state) => state.runs)
  const wickets = useSelector((state) => state.wickets)
  const target = useSelector((state) => state.target)
  const balls = useSelector((state) => state.balls)
  const [commentary, setCommentary] = useState('')
  const winner = useSelector((state) => state.winner)
  const ballingCards = cricketData.ballingCards
  const shotTimings = cricketData.shotTimings
  const [ballType, setRandomBallingType] = useState('')
  const battingCards = useSelector((state) => state.filteredBattingCards)
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
  useEffect(() => {
    if (winner) {
      setTimeout(() => {
        dispatch(updateRuns(0))
        dispatch(updateTarget(0))
        dispatch(updateOvers(0))
        dispatch(updateWickets(0))
        dispatch(updateBalls(0))
        setCommentary('')
      }, 3000)
      setTimeout(() => {
        dispatch(updateWinner(''))
      }, 10000)
    }
  }, [winner])
  const handleSubmit = (e) => {
    e?.preventDefault()
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

    const comment = commentsObj.find((comment) => comment.runs === currentRuns)
    const newCommentary = `Sudhakar bowled ${ballType} ball, \n Craig played ${shotType} ${batting} shot \n ${comment?.desc} - ${currentRuns} runs.`
    setCommentary(newCommentary)
    if (newCommentary) {
      speechSynthesis.cancel()
      const cmtry = new SpeechSynthesisUtterance(newCommentary)
      speechSynthesis.speak(cmtry)
    }
    declareWinner(updatedRuns, overs, balls, wickets, target, dispatch)
  }

  return (
    <Container>
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
export default SuperOver
