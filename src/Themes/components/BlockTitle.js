import React from 'react';
import styled from 'styled-components';
import i18n from 'Language/i18n';
import Tooltip from './Tooltip';

const Main = styled.div`
  width: 100%;
  font-size: 1.7em;
  font-weight: ${(props) => (props.lng === 'en' ? 500 : 600)};
  padding-bottom: 20px;
  ${(props) => props.noPadding && `
    padding: 0;
  `}
  display: flex;
  align-items: center;
  text-align: left;
`;

const Front = styled.span`
  background: ${(props) => props.theme.secondary};
  border-radius: 5px;
  font-size: 0.7em;
`;

const Text = styled.span`
  padding-left: 10px;
`;

const BlockTitle = ({
  children, instruction, placement, ballType, ...props
}) => (
  <Main {...props} lng={i18n.language}>
    <Front>&nbsp;</Front>
    <Text>{children}</Text>
    {
      instruction && (
      <>
        <Tooltip placement={placement} type="question">{instruction}</Tooltip>
      </>
      )
    }
    {
      ballType && (
        <>
          <Tooltip placement="right" type="ballType">點選查看球種列表</Tooltip>
        </>
      )
    }
  </Main>
);

export default BlockTitle;
