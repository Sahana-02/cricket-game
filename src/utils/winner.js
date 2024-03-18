import { updateWinner } from '../redux/action'
export const declareWinner = (
  updatedRuns,
  overs,
  balls,
  wickets,
  target,
  dispatch
) => {
  let winner = ''
  if (updatedRuns >= target) {
    winner = 'Australia'
  } else if (overs * 6 === balls || wickets === 10) {
    winner = 'India'
  }
  dispatch(updateWinner(winner))
}
