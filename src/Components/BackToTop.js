import React, { useState } from 'react';
import styled from 'styled-components';

const Main = styled.div`
  cursor: pointer;
  position: fixed;
  outline: none;
  border: none;
  right: 30px;
  bottom: 20px;
  height: 50px;
  width: 50px;
  line-height: 50px;
  font-size: 20px;
  text-align: center;
  border-radius: 50%;
  background: #3fbbc3;
  opacity: 0.5;
  animation: fadeIn 0.3s;
  transition: opacity 0.4s;
  :hover{
    opacity: 0.8;
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0.5;
    }
  }
`;

const Arrow = styled.i`
  border: solid #fff;
  border-width: 0 4px 4px 0;
  display: inline-block;
  padding: 6px;
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
`;

const Wrapper = styled.div`
  transform: translate(0, 3px);
  -webkit-transform: translate(0, 3px);
`;

const ScrollArrow = () => {
  const [showScroll, setShowScroll] = useState(false);
  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 70) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 70) {
      setShowScroll(false);
    }
  };
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  window.addEventListener('scroll', checkScrollTop);
  return (
    <Main onClick={scrollTop} style={{ height: 50, display: showScroll ? 'block' : 'none' }}>
      <Wrapper>
        <Arrow />
      </Wrapper>
    </Main>
  );
};

export default ScrollArrow;
