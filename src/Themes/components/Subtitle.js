import React from 'react';
import styled from 'styled-components';
import i18n from 'Language/i18n';

const Main = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.2em;
  padding-bottom: 30px;
  font-weight: bold;
  font-weight: ${(props) => (props.lng === 'en' ? 500 : 600)};
`;

const Subtitle = ({
  children, ...props
}) => (
  <Main {...props} lng={i18n.language}>
    {children}
  </Main>
);

export default Subtitle;
