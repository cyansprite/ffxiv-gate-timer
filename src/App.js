import {
  Alert,
  Paper,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import './App.css';
import * as React from 'react';
import MenuAppBar from './MenuAppBar.js'
import Timer from './Timer';
import Button from '@mui/material/Button';
import Util from './Util.js';
import AutohideSnackbar from './AutoHideSnack.js';
import * as colors from '@mui/material/colors';

function App() {
  const wasNotifying = Util.getBoolCookie('isNotifying')
  const darkThemeUndefined = Util.getCookie('isDarkTheme') === undefined;
  const [isNotifying, setNotifying] = React.useState(wasNotifying);
  const [permission, setPermissions] = React.useState(false);
  const [progress, setProgress] = React.useState(Util.getCookie('progress'));
  const [timeUntil, setTimeUntil] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [isDarkTheme, setDarkTheme] = React.useState(darkThemeUndefined || Util.getBoolCookie('isDarkTheme'));
  const [color, setColor] = React.useState(Util.getCookie('color') || 'amber');

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

  React.useEffect(() => {
    Util.setCookie('isDarkTheme', isDarkTheme)
  },[isDarkTheme])

  React.useEffect(() => {
    Util.setCookie('color', color)
  },[color])

  const secondary = isDarkTheme ? colors[color]['300']: colors[color][color === 'amber' ? '900' : '800']
  const primary = isDarkTheme ? colors.grey['100'] : colors.grey['100']

  const backgroundColor = isDarkTheme ? '#000000' : '#ffffff';

  const themeOptions = {
    palette: {
      mode: isDarkTheme ? 'dark': 'light',
      primary: {
        main: primary,
      },
      secondary: {
        // because Amber wants to be bright AF
        main: secondary,
      },
      amber: isDarkTheme ? colors.amber['300']: colors.amber['900'],
      blue: isDarkTheme ? colors.blue['300']: colors.blue['800'],
      blueGrey: isDarkTheme ? colors.blueGrey['300']: colors.blueGrey['800'],
      brown: isDarkTheme ? colors.brown['300']: colors.brown['800'],
      cyan: isDarkTheme ? colors.cyan['300']: colors.cyan['800'],
      deepOrange: isDarkTheme ? colors.deepOrange['300']: colors.deepOrange['800'],
      deepPurple: isDarkTheme ? colors.deepPurple['300']: colors.deepPurple['800'],
      green: isDarkTheme ? colors.green['300']: colors.green['800'],
      // because for some reason it's gray, not grey, but otherwise it's grey.. nice
      gray: isDarkTheme ? colors.grey['300']: colors.grey['800'],
      indigo: isDarkTheme ? colors.indigo['300']: colors.indigo['800'],
      lightBlue: isDarkTheme ? colors.lightBlue['300']: colors.lightBlue['800'],
      lightGreen: isDarkTheme ? colors.lightGreen['300']: colors.lightGreen['800'],
      lime: isDarkTheme ? colors.lime['300']: colors.lime['800'],
      orange: isDarkTheme ? colors.orange['300']: colors.orange['800'],
      pink: isDarkTheme ? colors.pink['300']: colors.pink['800'],
      purple: isDarkTheme ? colors.purple['300']: colors.purple['800'],
      red: isDarkTheme ? colors.red['300']: colors.red['800'],
      teal: isDarkTheme ? colors.teal['300']: colors.teal['800'],
      yellow: isDarkTheme ? colors.yellow['300']: colors.yellow['800'],
    },
  };


  const theme = createTheme(themeOptions);
  return (
    <ThemeProvider theme={theme}>
      <div className="App"
           style={{
              backgroundImage: 'url(' + Image + ')',
              backgroundSize: 'auto',
              height: '100vh',
           }}>
        <div
           style={{
            backgroundColor: {backgroundColor},
            background: `radial-gradient(circle at 50%, ${backgroundColor}, ${secondary} 9999px, ${backgroundColor})`,
            height: '100vh',
           }}>
          <div class="body" role="main">
            <MenuAppBar
              color={color} setColor={setColor}
              isDarkTheme={isDarkTheme} setDarkTheme={setDarkTheme}
              isNotifying={isNotifying} setNotifying={setNotifying} class="normPadding">
            </MenuAppBar>
            <AutohideSnackbar open={open} setOpen={setOpen}></AutohideSnackbar>

            <div class="paper">
              <Paper elevation={0}>
                <Typography variant="h2" component="h1" color="secondary">
                  Until Next Gate: {timeUntil}
                </Typography>
                <Timer
                  timeUntil={timeUntil} setTimeUntil={setTimeUntil}
                  progress={progress} setProgress={setProgress}>
                </Timer>
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
              </Paper>
            </div>

            <Typography className="bottom" variant="p" component="p" color="secondary">
              Sound file and any reference to FFXIV, Gold Saucer or Gates © SQUARE ENIX
            </Typography>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
