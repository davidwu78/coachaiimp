import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Icon from './Icon';

const StyledDivider = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${(props) => props.marginBottom}px;
`;

const Line = styled.div`
  width: 150px;
  height: 1px;
  margin: 10px 0 0 0;
  border: solid 1px #c3c3c3;
`;

const IconWrapper = styled.div`
  margin: 0 12px;
`;

class Divider extends PureComponent {
  render() {
    return (
      <StyledDivider {...this.props}>
        <Line />
        <IconWrapper>
          <Icon type="badminton" size={20} />
        </IconWrapper>
        <Line />
      </StyledDivider>
    );
  }
}

export default Divider;
