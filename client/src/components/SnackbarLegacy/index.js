import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';

export const CustomSnackbarLegacy = props => {
  let {
    open,
    anchorOrigin,
    autoHideDuration,
    messageInfo,
    handleClose,
    variant = 'success'
  } = props;

  const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon
  };
  const Icon = variantIcon[variant];

  return (
    <Snackbar
      anchorOrigin={anchorOrigin || { vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={autoHideDuration || 5000}
      onClose={handleClose}
      message={
        <span>
          <Icon className={'mr-2'} /> {messageInfo}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      ]}
    />
  );
};
