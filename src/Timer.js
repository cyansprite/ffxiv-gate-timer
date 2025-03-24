import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function ProgressBar(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

ProgressBar.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

Timer.getProgress = () => {
  /*
   * Gates are mod 20 of an hour
   * */
  const now = new Date(Date.now());
  const mins = now.getMinutes();
  const secs = now.getSeconds();
  const mod = mins % 20;
  const percent = ((mod + secs / 60.0) / 20.0) * 100.0;

  return {
    progress: Math.floor(percent),
    timeUntil: `${19 - mod}:${String(60 - secs).padStart(2, '0')}`
  }
};

export default function Timer({ progress, setProgress, timeUntil, setTimeUntil }) {
  React.useEffect(() => {
    const timer = setInterval(() => {
      const vals = Timer.getProgress()
      setProgress(vals.progress)
      setTimeUntil(vals.timeUntil)
    }, 100);
    return () => {
      clearInterval(timer);
    };
  }, [setProgress, setTimeUntil]);

  return (
    <Box sx={{ width: '100%' }}>
      <ProgressBar color='secondary' value={progress} />
    </Box>
  );
}

