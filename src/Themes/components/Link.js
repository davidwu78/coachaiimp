import React from 'react';
import styled from 'styled-components';
import i18n from 'Language/i18n';

const Main = styled.span`
  cursor: pointer;
  color: ${(props) => props.theme.textLightWhite};
  font-weight: ${(props) => (props.lng === 'en' ? 400 : 600)};
  /* ${(props) => props.rightBorder && `
    border-right: solid 1px #fff;
  `} */
`;

const LinkBase = styled.a`
  &:hover {
    color: transparent;
  }
`;

const Link = ({
  to = '/', className, children, ...props
}) => (
  <LinkBase href={to}>
    <Main {...props} className={className} lng={i18n.language}>{children}</Main>
  </LinkBase>
);

export default Link;
