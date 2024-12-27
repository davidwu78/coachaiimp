import React from 'react';
import styled from 'styled-components';

const Main = styled.div`
  color: ${(props) => props.theme.textDark};
  padding-bottom: 100px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;
  width: 100%;
  max-width: 1140px; 
`;

const Page = ({
  children, ...props
}) => (
  <Main {...props}>
    {children}
  </Main>
);

export default Page;
