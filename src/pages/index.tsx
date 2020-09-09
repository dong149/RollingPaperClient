import { makeStyles } from '@material-ui/core';
import Head from 'next/head';
import Link from 'next/link';
import * as React from 'react';

import Buttons from '../components/Buttons';
import Layouts from '../components/Layouts';
import StickyFooter from '../components/StickyFooter';

const useStyles = makeStyles({
  main: {
    width: '100%',
    textAlign: 'left',
    fontSize: '32px',
    fontWeight: 'bold',
    lineHeight: '46px',
    marginTop: '30px',
  },
  sectionWrapper: {
    position: 'relative',
    minHeight: '100vh',
  },
  rolling: {
    width: '343px',
    margin: '0 auto',
    marginTop: '30px',
  },
});
const Index = () => {
  const classes = useStyles();

  return (
    <div>
      <Head>
        <title>롤링 페이퍼 :: 특별한 온라인 선물</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1 ,user-scalable=no, maximum-scale=1'
        />
        <meta name='description' content='롤링 페이퍼 쉽게 만들기' />
        <meta
          name='keywords'
          content='롤링페이퍼,선물,생일,여자친구,100일,친구'
        />
      </Head>
      <div className={ `section ${classes.sectionWrapper}` }>
        <Layouts>
          <div className={ classes.main }>
            <span>롤링페이퍼로</span>
            <br />
            <span>마음을 선물하세요.</span>
          </div>
          <img
            className={ classes.rolling }
            src='/gif/main.gif'
            alt='롤링페이퍼 메인 이미지'
          />
          <StickyFooter position='absolute'>
            <Link
              href={{
                pathname: '/celebrate',
              }}
            >
              <Buttons
                full={ true }
              >
                롤링페이퍼 생성 및 조회하기
              </Buttons>
            </Link>
          </StickyFooter>
        </Layouts>
      </div>
    </div>
  );
};

export default Index;
