import CricketLogo from '../assets/images/cricket-white32.png'
import '../assets/css/Styles.css'
import Settings from '../pages/Settings'
const Header = () => {
  return (
    <header className='header'>
      <img
        className='cric-img'
        src={CricketLogo}
        alt='cricket logo'
        onClick={() => {
          window.location.href = '/'
        }}
      />
      <h1>CricSummit 2021</h1>
      <div className="settings-container">
          <Settings />
        </div>
    </header>
  )
}
export default Header
