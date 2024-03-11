// actions.js
export const UPDATE_RUNS = 'UPDATE_RUNS'
export const UPDATE_BALLING_CARDS = 'UPDATE_BALLING_CARDS'
export const UPDATE_FILTERED_BATTING_CARDS = 'UPDATE_FILTERED_BATTING_CARDS'
export const UPDATE_SHOT_TIMINGS = 'UPDATE_SHOT_TIMINGS'
export const TARGET = 'TARGET'
export const OVERS = 'OVERS'
export const WICKETS = 'WICKETS'
export const BALLS = 'BALLS'
export const WINNER = 'WINNER'

export const updateRuns = (runs) => ({
  type: UPDATE_RUNS,
  payload: runs
})

export const updateBallingCards = (ballingCards) => ({
  type: UPDATE_BALLING_CARDS,
  payload: ballingCards
})

export const updateFilteredBattingCards = (filteredBattingCards) => ({
  type: UPDATE_FILTERED_BATTING_CARDS,
  payload: filteredBattingCards
})

export const updateShotTimings = (shotTimings) => ({
  type: UPDATE_SHOT_TIMINGS,
  payload: shotTimings
})

export const updateTarget = (target) => ({
  type: TARGET,
  payload: target
})

export const updateOvers = (overs) => ({
  type: OVERS,
  payload: overs
})

export const updateWickets = (wickets) => ({
  type: WICKETS,
  payload: wickets
})

export const updateBalls = (balls) => ({
  type: BALLS,
  payload: balls
})

export const updateWinner = (winner) => ({
  type: WINNER,
  payload: winner
})
