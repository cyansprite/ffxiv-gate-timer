import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';

export default function AutohideSnackbar({open, setOpen}) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message="Go do that Gate!!"
      />
    </div>
  );
}
