import { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { styled } from 'styled-components'
import Match from './Match'
import SuperOver from './SuperOver'
import { useDispatch } from 'react-redux'
import { updateRuns, updateTarget, updateOvers } from '../redux/action'

const Cricket = () => {
  const StyledDiv = styled.div`
    width: 100%;
    height: calc(100vh - 60px);
    background-image: url('/cricket-background.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    filter: brightness(0.8);
    > .account-tab {
      backdrop-filter: brightness(0.5);
      justify-content: center;
      font-size: 18px;
      font-weight: 500;
      li {
        padding: 10px;
        button {
          background: repeating-radial-gradient(black, transparent 100px);
          border-radius: 25px;
          width: 6em;
          color: #f2f2f2;
          &.active {
            background: #f2f2f2;
          }
        }
      }
    }
  `
  const [tab, setTab] = useState('match')
  const dispatch = useDispatch()
  const handleTabChange = (newTab) => {
    setTab(newTab)
    if (newTab === 'match') {
      dispatch(updateRuns(0))
      dispatch(updateTarget(0))
      dispatch(updateOvers(1))
    }
    if (newTab === 'superOver') {
      dispatch(updateRuns(0))
      dispatch(updateTarget(0))
      dispatch(updateOvers(0))
    }
  }
  return (
    <div>
      <StyledDiv>
        <Tabs
          id='myaccount-id'
          activeKey={tab}
          onSelect={handleTabChange}
          className='account-tab'
          forceRenderTabPanel={true}
        >
          <Tab eventKey='match' title='Play Game' style={{ padding: 10 }}>
            <Match />
          </Tab>
          <Tab eventKey='superOver' title='Super Over' style={{ padding: 10 }}>
            <SuperOver />
          </Tab>
        </Tabs>
      </StyledDiv>
    </div>
  )
}

export default Cricket
