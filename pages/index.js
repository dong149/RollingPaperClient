// 스플래쉬 뷰
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Buttons from '../components/Buttons';
import StickyFooter from '../components/StickyFooter';
import Layouts from '../components/Layouts';
import { makeStyles } from '@material-ui/core';
import ReactFullpage from '@fullpage/react-fullpage';
import AutosizeInput from 'react-input-autosize';
import { isEmpty } from '../functions';
import rollingService from '../services/rollingService';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
const useStyles = makeStyles({
  main: {
    width: '100%',
    textAlign: 'left',
    fontSize: '32px',
    fontWeight: 'bold',
    lineHeight: '46px',
  },
  sectionWrapper: {
    position: 'relative',
    minHeight: '100vh',
  },
  rolling: {
    width: '100%',
    marginTop: '48px',
    marginBottom: '87px',
  },
});
const Index = () => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit = async () => {
    console.log(name);
    console.log(password);
    let temp = {};
    try {
      await rollingService
        .getRollingByName(name, password)
        .then(async (res) => {
          console.log(res);
          if (!isEmpty(res)) {
            // alert('이미존재');
            setError(1);
            return;
          }
          await rollingService
            .postRolling({
              name: name,
              color: '#f64c71',
              password: password,
            })
            .then((res) => {
              // alert('성공');
              setError(2);
            });
        });
    } catch (err) {
      console.log(err);
      return;
    }
  };
  return (
    <div>
      <Head>
        <title>롤링 페이퍼 :: 특별한 온라인 선물</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 ,user-scalable=no, maximum-scale=1"
        />
        <meta name="description" content="롤링 페이퍼 쉽게 만들기" />
        <meta
          name="keywords"
          content="롤링페이퍼,선물,생일,여자친구,100일,친구"
        />
      </Head>
      <ReactFullpage
        controlArrows={false}
        render={({ state, fullpageApi }) => {
          return (
            <ReactFullpage.Wrapper>
              <div className={`section ${classes.sectionWrapper}`}>
                <Layouts>
                  <div className={classes.main}>
                    <span>롤링페이퍼로</span>
                    <br />
                    <span>마음을 선물하세요.</span>
                  </div>
                  <img
                    className={classes.rolling}
                    src="/images/pen.jpeg"
                    alt="롤링페이퍼 메인 이미지"
                  />
                  <StickyFooter position="absolute">
                    <Buttons
                      full={true}
                      onClick={() => {
                        fullpageApi.moveSectionDown();
                        fullpageApi.moveSectionDown();
                      }}
                    >
                      롤링페이퍼 시작하기
                    </Buttons>
                    <Buttons full={true} light={true}>
                      내 롤링페이퍼 찾기
                    </Buttons>
                  </StickyFooter>
                </Layouts>
              </div>
              <div className={`section ${classes.sectionWrapper}`}>
                <Layouts>
                  <div
                    className={classes.main}
                    style={{ marginBottom: '16px' }}
                  >
                    <span>지금까지</span>
                    <br />
                    <CountUp end={3243} redraw={true}>
                      {({ countUpRef, start }) => (
                        <VisibilitySensor onChange={start} delayedCall>
                          <span ref={countUpRef} />
                        </VisibilitySensor>
                      )}
                    </CountUp>
                    <span>명이 작성하고</span>
                    <br />
                    <CountUp end={132} redraw={true}>
                      {({ countUpRef, start }) => (
                        <VisibilitySensor onChange={start} delayedCall>
                          <span ref={countUpRef} />
                        </VisibilitySensor>
                      )}
                    </CountUp>
                    <span>명이 축하를</span>
                    <br />
                    <span>받았어요!</span>
                  </div>
                  <StickyFooter position="absolute">
                    <Buttons
                      full={true}
                      onClick={() => {
                        fullpageApi.moveSectionDown();
                      }}
                    >
                      다음
                    </Buttons>
                  </StickyFooter>
                </Layouts>
              </div>
              <div className={`section ${classes.sectionWrapper}`}>
                <Layouts>
                  <div
                    className={classes.main}
                    style={{ marginBottom: '16px' }}
                  >
                    <span>받을 사람은</span>
                    <AutosizeInput
                      inputStyle={{
                        border: 0,
                        fontSize: 32,
                        outline: 'none',
                        display: 'inline-block',
                        fontWeight: 'lighter',
                        padding: '0',
                      }}
                      style={{
                        borderBottom: '1px solid #333',
                        display: 'inline-block',
                      }}
                      maxLength="10"
                      value={name}
                      placeholder="이름 혹은 애칭"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <br />
                    <span>이에요.</span>
                    <br />
                    <span>우리만의 신호는</span>
                    <br />
                    <AutosizeInput
                      type="password"
                      inputStyle={{
                        border: 0,
                        fontSize: '32px',
                        outline: 'none',
                        display: 'inline-block',
                        padding: '0',
                        fontWeight: 'lighter',
                      }}
                      style={{
                        borderBottom: '1px solid #333',
                        // color: "#D5D5D5",
                        display: 'inline-block',
                      }}
                      maxLength="10"
                      value={password}
                      placeholder="****"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <span>이에요.</span>
                  </div>
                  <StickyFooter position="absolute">
                    {!isEmpty(name) && !isEmpty(password) ? (
                      <Link
                        href={{
                          pathname: '/sender/main',
                          query: { name: name, num: password },
                        }}
                      >
                        {/*                   
                    <Link
                      href={`/sender/[main]`}
                      // p/[receiver]?name=${name}&pw=${password}&id=${id}
                      as={`/sender/main?name=${name}&num=${password}`}
                    > */}
                        <Buttons
                          full={true}
                          onClick={() => {
                            onSubmit();
                          }}
                        >
                          생성하기
                        </Buttons>
                      </Link>
                    ) : (
                      <Buttons full={true}>모두 작성해주세요</Buttons>
                    )}
                  </StickyFooter>
                </Layouts>
              </div>
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </div>
  );
};

export default Index;
