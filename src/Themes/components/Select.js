import React from 'react';
import styled from 'styled-components';

const CustomSelect = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  outline: 0;
  box-shadow: none;
  background-image: none;
  border-radius: .25em;
  border: solid 1px ${(props) => props.theme.imageBg};
  padding: 8px 30px 8px 15px;
  width: 100%;
  cursor: pointer;

  ::-ms-expand {
    display: none;
  }

  option{
    padding: 3px 0;
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  flex: ${(props) => props.flex};
  width: 100%;
  background: #fff;
  overflow: hidden;
  border-radius: .25em;

  ::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 10px;
    width: 0.5em;
    height: 0.3em;
    background-color: ${(props) => props.theme.textDark};
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
  }

  :hover::after {
    background-color: ${(props) => props.theme.secondary};
  }

  :hover select{
    background: ${(props) => props.theme.chartBg};
  }
`;

const Select = ({
  children, onChange, value, ...props
}) => (
  <SelectWrapper {...props}>
    <CustomSelect onChange={onChange} value={value} {...props}>
      {children}
    </CustomSelect>
  </SelectWrapper>
);

export default Select;
