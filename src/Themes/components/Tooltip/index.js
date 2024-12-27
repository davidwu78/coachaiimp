import React from 'react';
import styled from 'styled-components';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Icon from 'Themes/components/Icon';
import './index.css';

const Content = styled.div`
  font-family: 'Poppins', sans-serif;
  text-align: left;
  font-size: 16px;
  padding: 3px;

  span{
    font-weight: 500;
    font-size: 15px;
    background: #f7f7f7;
    padding: 0 3px;
    border-radius: 5px;
    margin-top: 4px;
    margin-bottom: 4px;
  }

  ul{
    padding: 0;
    margin: 0;
    margin-left: 30px;
  }
`;

const Wrapper = styled.span`
  padding-left: 10px;
`;

const CustomTooltip = ({
  children, placement, type, ...props
}) => (
  <OverlayTrigger
    {...props}
    placement={placement || 'right'}
    overlay={(
      <Tooltip id="instruction" className={`myTooltip ${placement === 'top' ? 'myTooltipTop' : 'myTooltipRight'}`}>
        <Content>
          {children}
        </Content>
      </Tooltip>
    )}
  >
    {
      type === 'ballType' ? (
        <Wrapper>
          <a href="/ballTypeDescription" target="_blank">
            <Icon type="badminton" fill="#3fbbc3" size={20} />
          </a>
        </Wrapper>
      ) : (
        <Wrapper>
          <Icon type="question" size={20} />
        </Wrapper>
      )
    }
  </OverlayTrigger>
);

export default CustomTooltip;
