import React from 'react';
import {  Box } from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 3,
};

export const ModalBox = React.forwardRef((props, ref) => (<Box {...props} ref={ref} sx={modalStyle}>{props.children}</Box>))
