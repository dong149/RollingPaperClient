import React, { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, NoSsr } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  btn: {
    minWidth: '125px',
    height: '61px',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#fff',
    background: '#222',
    borderRadius: '20px',
    boxShadow: 'none',
    '&:hover': {
      border: 'none',
      background: '#C4C4C4',
      boxShadow: 'none',
    },
  },
  btnDark: {
    color: '#fff',
    background: '#342F2F',
  },
  btnLight: {
    color: '#000',
    border: '1px solid #A3A3A3',
    background: '#fff',
  },
}));

const ButtonsLink = forwardRef(function ButtonsLink(props, ref) {
  const classes = useStyles();
  const { content, light, full, onClick } = props;
  return (
    // <NoSsr>
    <Button
      variant="contained"
      fullWidth={full ? true : false}
      className={
        classes.btn + ' ' + (light ? classes.btnLight : classes.btnDark)
      }
      onClick={onClick}
    >
      {content}
    </Button>
    // </NoSsr>
  );
});

export default ButtonsLink;
