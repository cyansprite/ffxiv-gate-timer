import './SoundSlider.css'
import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import Util from './Util';

export default function SoundSlider() {
  const [value, setValue] = React.useState(Util.getIntCookie('volume') || 30);

  Util.setVolume(value);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
    Util.setVolume(value);
    Util.setCookie('volume', newValue)
  };

  return (
    <Box sx={{ width: 200, alignContent: 'center', mr: 4.5 }}>
      <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
        <VolumeDown />
        <Slider aria-label="Volume"
                value={value}
                color="secondary"
                valueLabelDisplay="auto"
                onChange={handleChange} />
        <VolumeUp />
      </Stack>
    </Box>
  );
}
