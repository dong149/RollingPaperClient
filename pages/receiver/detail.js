import React, { useState, useRef } from 'react';
import Layouts from '../../components/Layouts';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Buttons from '../../components/Buttons';
import Slider from 'react-slick';
import Header from '../../components/Header';
import StickyFooter from '../../components/StickyFooter';
import Link from 'next/link';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import rollingService from '../../services/rollingService';

const cardList = Array(10).fill('카드'); // 임시 배열

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: 'relative',
    minHeight: '100vh',
    flexDirection: 'column',
    background: '#FFF',
  }, // TODO: 나중에 상황 보고 공통화 및 일괄 삭제
  cardWrapper: {
    padding: '0 10px',
  },
  card: {
    overflow: 'hidden',
    // width: '317px',
    height: '426px',
    marginTop: '35px',
    background: '#E8E6DC',
    borderRadius: '13px',
    transition: 'all .5s ease-in-out',
  },
  cardActive: {
    marginTop: 0,
    overflow: 'hidden',
    height: '426px',
    background: '#E8E6DC',
    borderRadius: '13px',
    transition: 'all .5s ease-in-out',
  },
  title: {
    fontSize: '26px',
  },
  slider: {
    width: 'calc(100% + 32px)',
    marginTop: '75px',
    marginLeft: '-16px',
    alignSelf: 'normal',
  },
  sender: {
    zIndex: 10,
    marginTop: '-33px',
    marginLeft: '24px',
    textAlign: 'left',
    fontSize: '24px',
  },
  cardCenter: {
    textAlign: 'center',
  },
  iconWrapper: {
    display: 'block',
    background: 'transparent',
    border: 'none',
    margin: '0',
    padding: '0',
  },
  icons: {
    width: '48px',
  },
}));

const Detail = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const customeSlider = useRef();
  const { posts, name, num, index } = props;
  const currentIndex = Number(index ?? 0);
  const [sliderIndex, setSliderIndex] = useState(currentIndex + 1);
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '30px',
    slidesToShow: 1,
    speed: 500,
    arrows: false,
    initialSlide: currentIndex,
    beforeChange: (current, next) => {
      setSliderIndex(next + 1);
    },
  };
  const gotoNext = (e) => {
    e.preventDefault();
    customeSlider.current.slickNext();
  };
  const gotoPrev = (e) => {
    e.preventDefault();
    customeSlider.current.slickPrev();
  };
  return (
    <Layouts className={classes.root}>
      <Header>
        <Link
          href={{
            pathname: '/receiver/main',
            query: { name: name, num: num },
          }}
        >
          <a className={classes.iconWrapper}>
            <img
              src="/icons/back-icon.png"
              alt="뒤로가기"
              className={classes.icons}
            />
          </a>
        </Link>
        <div className={classes.title}>
          <strong>{sliderIndex}</strong> / {posts.contents.length}
        </div>
        <button className={classes.iconWrapper}>
          <img
            src="/icons/download-icon.png"
            alt="다운받기"
            className={classes.icons}
          />
        </button>
      </Header>
      <Slider {...settings} ref={customeSlider} className={classes.slider}>
        {posts.contents.map((value, i) => (
          <>
            <div className={classes.cardWrapper}>
              <div
                key={i}
                className={
                  i === sliderIndex - 1 ? classes.cardActive : classes.card
                }
              >
                {value.content}
              </div>
            </div>
            <div className={classes.sender}>
              <b>From.</b>
              {value.author} {sliderIndex}
            </div>
          </>
        ))}
      </Slider>

      <StickyFooter>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Buttons full light onClick={(e) => gotoPrev(e)}>
              이전장
            </Buttons>
          </Grid>
          <Grid item xs={6}>
            <Buttons full onClick={(e) => gotoNext(e)}>
              다음장
            </Buttons>
          </Grid>
        </Grid>
      </StickyFooter>
    </Layouts>
  );
};

Detail.getInitialProps = async (context) => {
  const name = context.query.name;
  const num = context.query.num;
  const index = context.query.index;
  const res = await rollingService.getRollingByName(name, num);

  return {
    posts: res.data,
    name: name,
    num: num,
    index: index,
  };
};

export default Detail;
