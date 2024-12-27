import React from 'react';
import styled from 'styled-components';
import { noop } from 'lodash';

const Main = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  outline: none;
  width: 22px;
  height: 22px;
  border-radius: 2px;
  border: solid 2px ${(props) => props.theme.imageBg};
  position: relative;
  margin: auto;
  display: flex;
  cursor: pointer;

  :before{
    content: '';
    display: block;
    position: absolute;
    top: 0px;
    left: 6px;
    width: 6px;
    height: 14px;
    border: solid ${(props) => props.theme.secondary};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    opacity: 0;
  }
  
  :checked:before{
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.div`
  display: flex;
  padding: 0 10px;
`;

const Checkbox = ({
  children, onChange = noop, checked = noop, value, ...props
}) => (
  <Wrapper>
    <Main type="checkbox" value={value} onChange={onChange} checked={checked} {...props} />
    { children && (<Label>{children}</Label>)}
  </Wrapper>
);

export default Checkbox;
