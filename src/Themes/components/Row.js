import React from 'react';
import styled from 'styled-components';

const Main = styled.div`
  padding: 15px 20px;
  align-items: center;
  display: flex;
  ${(props) => props.nolimit && `
    max-height: none;
  `}
  ${(props) => props.noPadding && `
    margin: 0;
    padding: 0;
  `}
  ${(props) => props.noTopBottom && `
    margin: 0 20px;
  `}
`;

const Row = ({ children, ...props }) => (
  <Main {...props}>
    {children}
  </Main>
);

export default Row;
