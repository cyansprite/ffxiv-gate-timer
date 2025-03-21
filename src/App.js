import './App.css';
import * as React from 'react';
import MenuAppBar from './AppBar.js'
import LinearWithValueLabel from './Timer';
import { Alert } from '@mui/material';
import Button from '@mui/material/Button';
import Util from './Util.js';
import AutohideSnackbar from './AutoHideSnack.js';

function App() {
  const wasNotifying = Util.getBoolCookie('isNotifying')
  const [isNotifying, setNotifying] = React.useState(wasNotifying);
  const [permission, setPermissions] = React.useState(false);
  const [progress, setProgress] = React.useState(Util.getCookie('progress'));
  const [open, setOpen] = React.useState(false);

  let lastProgressNotified = React.useRef(100)

  const checkPermissionInterval = setInterval(() => {
    const p = Util.getPermissionForAutoPlay()
    setPermissions(p);
    if (p) {
      clearInterval(checkPermissionInterval);
    }
  } ,1000);

  React.useEffect(() => {
    // NOTE: will be 9~10 seconds beforehand
    if (isNotifying && progress >= 99 && lastProgressNotified.current > progress) {
      setOpen(true)
      lastProgressNotified.current = progress;
      setTimeout(() => lastProgressNotified.current = 100, 10000);
      Util.playFateSound()
    }
    Util.setCookie('progress', progress)
  },[isNotifying, progress])

  React.useEffect(() => {
    Util.setCookie('isNotifying', isNotifying)
  },[isNotifying])

  return (
    <div className="App">
     <MenuAppBar isNotifying={isNotifying} setNotifying={setNotifying}></MenuAppBar>
     <AutohideSnackbar open={open} setOpen={setOpen}></AutohideSnackbar>
     <h1>Until Next Gate:</h1>
     <LinearWithValueLabel progress={progress} setProgress={setProgress}></LinearWithValueLabel>
     {
       (permission && isNotifying) &&
       (<Alert severity="error"
        action={
          <Button color="inherit" size="small" variant="outlined" onClick={Util.playFateSound}>
          Try to grant
          </Button>
        }
         >We need autoplay permission.</Alert>)
     }

    <p class="bottom">Sound file and any reference to FFXIV, Gold Saucer or Gates © SQUARE ENIX</p>
    </div>
  );
}

export default App;
