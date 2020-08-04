import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'calc(100% + 48px)',
    marginLeft: '-24px',
    padding: '25px 0 169px',
    overflow: 'hidden',
    background: '#fff',
    borderRadius: '28px',
  },
  card: {
    display: 'block',
    width: '123px',
    height: '169px',
    background: '#FDFEB8',
    border: '1px solid #666',
  },
}));

const styledRandom = (i) => {
  // TODO: 좀 더 자연스러운 랜덤 화면 구현
  let hashKey = (13 / (i + 1) + 0.2) % 1;
  let x = Math.floor(hashKey * 40);
  let y = Math.floor(hashKey * 40);
  let rotate = Math.floor(hashKey * (i % 2 === 0 ? 30 : -30));
  return {
    transform:
      'rotate(' +
      rotate +
      'deg)' +
      ' translateX(' +
      x +
      'px)' +
      ' translateY(' +
      y +
      'px)',
  };
};

const Cards = (props) => {
  const classes = useStyles();
  const { content } = props;
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {content.map((value, i) => (
          <Grid item xs={4} key={i}>
            <Link href={{ pathname: '/receiver/detail', query: { index: i } }}>
              <a elevation={0} className={classes.card} style={styledRandom(i)}>
                {value} {i}
              </a>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Cards;
