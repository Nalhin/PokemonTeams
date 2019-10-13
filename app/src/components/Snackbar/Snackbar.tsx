import * as React from 'react';
import MdSnackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import styled from '@emotion/styled';
import { PADDING } from '../../styles/padding';
import { SNACKBAR_COLORS } from '../../styles/snackbar';
import { SnackbarTypes } from '../../interfaces/snackbar';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';

const snackbarIcon = {
  [SnackbarTypes.success]: CheckCircleIcon,
  [SnackbarTypes.error]: ErrorIcon,
  [SnackbarTypes.info]: InfoIcon,
  [SnackbarTypes.warning]: WarningIcon,
};

type StyledSnackbarProps = {
  type: SnackbarTypes;
};

const StyledSnackbar = styled(MdSnackbar)`
  pointer-events: all;
  position: unset;
  transform: none;
  margin: ${PADDING.BASE};
  background: ${(props: StyledSnackbarProps) => SNACKBAR_COLORS[props.type]};
`;

const StyledSnackbarContent = styled(SnackbarContent)`
  background: ${(props: StyledSnackbarProps) => SNACKBAR_COLORS[props.type]};
`;

interface SnackbarProps {
  onClose: (id: string) => void;
  message: string;
  id: string;
  type: SnackbarTypes;
}

const autoHideDuration = 5000;

const Snackbar: React.FC<SnackbarProps> = ({ onClose, message, id, type }) => {
  const handleClose = React.useCallback(() => onClose(id), [id]);
  const Icon = snackbarIcon[type];

  return (
    <StyledSnackbar
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      open
      type={type}
      ClickAwayListenerProps={{ mouseEvent: false, touchEvent: false }}
    >
      <StyledSnackbarContent
        type={type}
        action={[
          <IconButton color="inherit" onClick={handleClose} key={id}>
            <CloseIcon />
          </IconButton>,
        ]}
        message={
          <span>
            <Icon />
            {message}
          </span>
        }
      />
    </StyledSnackbar>
  );
};

export default Snackbar;
