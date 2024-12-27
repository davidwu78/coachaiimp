import React from 'react';
import styled from 'styled-components';
import i18n from 'Language/i18n';

const Main = styled.div`
  margin-right: '4px';
  font-size: '15px';
  display: 'flex';
  align-items: center;
  font-weight: ${(props) => (props.lng === 'en' ? 500 : 600)};
  background: #3fbbc3;
  color: #fff;
  padding: 1px 3.5px;
  border-radius: 5px;
  margin-right: 3.5px;
`;

const Badge = ({
  children, ...props
}) => (
  <Main {...props} lng={i18n.language}>
    {children}
  </Main>
);

export default Badge;
