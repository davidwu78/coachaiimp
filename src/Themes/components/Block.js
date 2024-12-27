import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 50px;
  color: ${(props) => props.theme.textDark};
`;

const Main = styled.div`
  width: 100%;
  border-radius: 10px;
  border-color: ${(props) => props.theme.imageBg};
  border-style: solid;
  border-width: 2px;
  background: ${(props) => props.theme.justWhite};
  padding-bottom: 20px;
`;

const Block = ({ children, ...props }) => (
  <Wrapper>
    <Main {...props}>
      {children}
    </Main>
  </Wrapper>
);

export default Block;
