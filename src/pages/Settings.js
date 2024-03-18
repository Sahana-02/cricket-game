import { useRef, useState } from 'react'
import SettingsIcon from '@mui/icons-material/Settings'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Switch } from '@mui/material'
import '../assets/css/Styles.css'

const Settings = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [music, setMusic] = useState(false)

  const audioRef = useRef()
  const open = Boolean(anchorEl)

  const handleSettings = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMusic = () => {
    const isMusic = !music
    setMusic(isMusic)
    if (isMusic) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
    setAnchorEl(null)
  }

  return (
    <div className='StyledSettings'>
      <SettingsIcon
        fontSize='large'
        sx={{ color: 'white' }}
        onClick={handleSettings}
      />
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem>
          Music <Switch checked={music} onClick={handleMusic} />
        </MenuItem>
      </Menu>
      <audio ref={audioRef} preload loop>
        <source src='../audio/BBC-testCricket.mp3' type='audio/mp3' />
      </audio>
    </div>
  )
}

export default Settings
