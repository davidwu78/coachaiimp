import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 20px;
  align-items: center;
  max-height: 350px;
  display: flex;
`;

const Main = styled.div`
  height: 1px;
  width: 100%;
  background: ${(props) => props.theme.imageBg};
`;

const HorizontalLine = ({ ...props }) => (
  <Wrapper>
    <Main {...props} />
  </Wrapper>
);

export default HorizontalLine;
