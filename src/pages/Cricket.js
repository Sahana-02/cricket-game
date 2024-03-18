import { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import Match from './Match'
import SuperOver from './SuperOver'
import { useDispatch } from 'react-redux'
import { updateRuns, updateTarget, updateOvers } from '../redux/action'
import '../assets/css/Styles.css'

const Cricket = () => {
  const [tab, setTab] = useState('match')
  const dispatch = useDispatch()
  const handleTabChange = (newTab) => {
    setTab(newTab)
    if (newTab === 'match') {
      dispatch(updateRuns(0))
      dispatch(updateTarget(0))
      dispatch(updateOvers(0))
    }
    if (newTab === 'superOver') {
      dispatch(updateRuns(0))
      dispatch(updateTarget(0))
      dispatch(updateOvers(0))
    }
  }
  return (
    <div className='StyledDiv' data-testid='tab'>
      <Tabs
        id='cricGame-id'
        activeKey={tab}
        onSelect={handleTabChange}
        className='account-tab'
      >
        <Tab eventKey='match' title='Play Game' style={{ padding: 10 }}>
          <Match />
        </Tab>
        <Tab eventKey='superOver' title='Super Over' style={{ padding: 10 }}>
          <SuperOver />
        </Tab>
      </Tabs>
    </div>
  )
}

export default Cricket
