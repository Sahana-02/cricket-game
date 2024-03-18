import { Col, Container, Row, Image, Form, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
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
import cricketData from '../assets/cricketData/cricketData.json'
import { commentsObj } from '../utils/comments'
import { declareWinner } from '../utils/winner'
import { runsOptions } from '../utils/runs'
const Match = () => {
  const dispatch = useDispatch()
  const [ballType, setBallType] = useState('')
  const [batting, setBatting] = useState('')
  const [shotType, setShotType] = useState('')
  const [commentary, setCommentary] = useState('')
  const overs = useSelector((state) => state.overs)
  const runs = useSelector((state) => state.runs)
  const wickets = useSelector((state) => state.wickets)
  const target = useSelector((state) => state.target)
  const balls = useSelector((state) => state.balls)
  const winner = useSelector((state) => state.winner)
  const ballingCards = cricketData.ballingCards
  const [filteredBattingCards, setFilteredBattingCards] = useState([])
  const shotTimings = cricketData.shotTimings

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

  useEffect(() => {
    const ballingToBattingMap = {
      bouncer: ['pull', 'uppercut'],
      outswinger: ['coverdrive', 'squarecut', 'straight'],
      offcutter: ['straight', 'flick', 'leglance'],
      yorker: ['straight', 'scoop'],
      offbreak: ['sweep', 'leglance', 'flick'],
      inswinger: ['straight', 'flick', 'longon'],
      legcutter: ['squarecut', 'coverdrive'],
      slowballer: ['straight', 'coverdrive'],
      pace: ['straight', 'squarecut', 'coverdrive', 'longon'],
      doosra: ['sweep', 'squarecut'],
      default: [
        'straight',
        'flick',
        'leglance',
        'longon',
        'squarecut',
        'sweep',
        'coverdrive',
        'pull',
        'scoop',
        'uppercut'
      ]
    }

    // Set filtered batting cards based on balling type
    const filteredBattingOptions =
      ballingToBattingMap[ballType] || ballingToBattingMap.default
    const filteredBattingCards = filteredBattingOptions.map((option) => ({
      value: option,
      label: option.charAt(0).toUpperCase() + option.slice(1) // Capitalize first letter
    }))

    setFilteredBattingCards([
      { value: '', label: 'Select Batting' },
      ...filteredBattingCards
    ])
  }, [ballType])

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
    const completedBalls = balls + 1
    dispatch(updateBalls(completedBalls))
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
    const comment = commentsObj.find((comment) => comment.runs === currentRuns)
    const newCommentary = comment?.desc
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
export default Match
