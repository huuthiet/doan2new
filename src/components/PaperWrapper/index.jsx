import React, { memo } from 'react';
import Paper from '@mui/material/Paper';

function PaperWrapper(props) {
  const { style = {}, elevation = 3, className, children } = props;

  return (
    <Paper
      elevation={elevation}
      className={`paper-wrapper ${className || ''}`}
      style={{
        marginTop: style.marginTop || 0,
        marginBottom: style.marginBottom || 0,
        padding: style.padding || 0,
        position: style.position || 'relative',
        ...style,
      }}
    >
      {children}
    </Paper>
  );
}

PaperWrapper.propTypes = {};

export default memo(PaperWrapper);
