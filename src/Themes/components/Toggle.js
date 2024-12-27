import React from 'react';
import styled from 'styled-components';
import { noop } from 'lodash';

const Main = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  outline: none;
  width: 35px;
  height: 21px;
  border-radius: 10.5px;
  position: relative;
  background: ${(props) => props.theme.imageBg};
  transition: background-color .5s;
  cursor: pointer;

  :before{
    content: "";
    position: absolute;
    top: 1px;
    left: 1px;
    height: 19px;
    width: 19px;
    background-color: ${(props) => props.theme.justWhite};
    border-radius: 9.5px;
    border: solid 1px #b5b5b5;
    transition: all .5s;
  }

  :checked{
    background: ${(props) => props.theme.secondary};
    transition: background-color .5s;
  }

  :checked:before{
    transform: translate(75%);
    transition: all .5s;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 30px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
`;

const TextWrapper = styled.div`
  display: flex;
  padding-left: 10px;
`;

const Toggle = ({
  children, onChange = noop, checked = noop, ...props
}) => (
  <Wrapper>
    <CheckboxWrapper>
      <Main type="checkbox" checked={checked} onChange={onChange} {...props} />
    </CheckboxWrapper>
    <TextWrapper>
      {children}
    </TextWrapper>
  </Wrapper>
);

export default Toggle;
