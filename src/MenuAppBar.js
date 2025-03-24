import './MenuAppBar.css';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import SoundSlider from './SoundSlider';

export default function MenuAppBar({
  isNotifying,
  setNotifying,
  isDarkTheme,
  setDarkTheme,
  color,
  setColor
}) {
  const colorOptions = [
    "amber", "blue", "blueGrey", "brown",
    "cyan", "deepOrange", "deepPurple",
    "green", "grey", "indigo", "lightBlue",
    "lightGreen", "lime", "orange", "pink",
    "purple", "red", "teal", "yellow"
  ]

  const handleChange = (value, func) => {
    func(value)
  };

  // NOTE It would probably be good to divide each component out
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar class="toolBar">
          <Typography variant="h5" component="div" color="secondary" sx={{
            flexGrow: 1,
            margin: 0,
            alignContent: 'center',
            pl: '20px'
          }}>
            Gold Saucer Timer
          </Typography>

          <FormGroup class="flexer">
            {
              isNotifying && <SoundSlider></SoundSlider>
            }

            <Box sx={{ mr: 3, mt: 2.5 }}>
              <FormControlLabel
                control={
                  <div class="flexer">
                  {
                    isNotifying ? <NotificationsActiveIcon className="icon"/>
                                : <NotificationsOffIcon className="icon"/>
                  }
                  <Switch
                    checked={isNotifying}
                    color= 'secondary'
                    name="setNotifying"
                    onChange={e => handleChange(e.target.checked, setNotifying)}
                    aria-label="Notify Switch"
                  />
                  </div>
                }/>
              <FormControlLabel
                control={
                  <div class="flexer">
                  {
                    isDarkTheme ? <DarkModeIcon className="icon"/>
                                : <LightModeIcon className="icon"/>
                  }
                  <Switch
                    checked={isDarkTheme}
                    color= 'secondary'
                    name="setDarkTheme"
                    onChange={(e) => handleChange(e.target.checked, setDarkTheme)}
                    aria-label="Dark mode switch"
                  />
                  </div>
                }/>
            </Box>

            <Box sx={{ minWidth: 120, mr: 3, }}>
              <FormControl fullWidth
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                <InputLabel id="theme-color-label" color="secondary">Theme Color</InputLabel>
                <Select
                  color="secondary"
                  labelId="theme-color-label"
                  id="theme-color-select"
                  value={color}
                  label="Color"
                  name="setColor"
                  onChange={e => handleChange(e.target.value, setColor) }
                  options={colorOptions}
                  aria-label="Theme color picker"
                  children={
                    colorOptions.map((color, index) => <MenuItem key={index} value={color} color='secondary'
                      sx={{
                        textTransform: 'capitalize',
                      }}>
                      <Typography variant="p" component="div" color={color}
                      sx={{
                        textTransform: 'capitalize',
                      }}>
                        {color}
                      </Typography>
                    </MenuItem>)
                  }
                >
                </Select>
              </FormControl>
            </Box>
          </FormGroup>

        </Toolbar>
      </AppBar>
    </Box>
  );
}

