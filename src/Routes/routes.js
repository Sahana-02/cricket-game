import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from '../components/HomePage'
import CricketContainer from '../components/CricketContainer'

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/playGame' component={CricketContainer} />
      </Switch>
    </Router>
  )
}

export default Routes
