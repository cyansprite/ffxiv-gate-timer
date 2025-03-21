import './AppBar.css';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

export default function MenuAppBar({ isNotifying, setNotifying }) {
  const handleChange = (event) => {
    setNotifying(event.target.checked);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormGroup>
        <FormControlLabel
          control={
            <div class="mainDiv">
            {
              isNotifying ? <NotificationsActiveIcon/>
                          : <NotificationsOffIcon/>
            }
            <Switch
              checked={isNotifying}
              onChange={handleChange}
              aria-label="login switch"
            />
            </div>
          }
          label= {
            isNotifying ?
            (
              <p>
                Turn off notifications
              </p>
            )
            :
            (
              <p>
                Turn on notifications
              </p>
            )
          }
        />
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gold Saucer Timer!
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

