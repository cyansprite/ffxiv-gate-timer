import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props) {
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

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

LinearWithValueLabel.getProgress = () => {
  /*
   * Gates are mod 20 of an hour
   * */
  const now = new Date(Date.now());
  const mins = now.getMinutes();
  const secs = now.getSeconds();
  const mod = mins % 20;
  const percent = ((mod + secs / 60.0) / 20.0) * 100.0;
  return Math.floor(percent)
};

export default function LinearWithValueLabel({ progress, setProgress }) {

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => LinearWithValueLabel.getProgress())
    }, 100);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}

