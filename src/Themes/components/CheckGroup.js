import React from 'react';
import styled from 'styled-components';
import { noop } from 'lodash';

const Main = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  outline: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: solid 2px ${(props) => props.theme.imageBg};
  position: relative;
  margin: auto;
  display: flex;
  cursor: pointer;

  :before{
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: ${(props) => props.theme.secondary};
    transform: translate(-50%, -50%);
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

const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

const Label = styled.div`
  display: flex;
  padding: 0 10px;
`;

const CheckGroup = ({
  onChange = noop, ...props
}) => (
  <Wrapper>
    {
      props.labels.length > 0 && props.labels.length === props.values.length && (
        props.values.map((value, index) => (
          <Item key={`check-group-${value}-${props.labels[index]}`}>
            <Main type="checkbox" value={value} checked={value === props.selected} onChange={onChange} />
            <Label>{props.labels[index]}</Label>
          </Item>
        ))
      )
    }
  </Wrapper>
);

export default CheckGroup;
