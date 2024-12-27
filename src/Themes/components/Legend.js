import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
  ${(props) => (props.center && `
    margin: auto;
  `)}
`;

const Label = styled.div`
  display: flex;
  margin-right: 30px;
  margin-left: 10px;
  ${(props) => (props.hide && `
    opacity: 0;
  `)}
`;

const Square = styled.div`
  display: flex;
  width: 20px;
  height: 20px;
  background: ${(props) => (props.color === 'player' && props.theme.chartPrimary)
  || (props.color === 'player_' && props.theme.bgPrimary)
  || (props.color === 'rival_' && props.theme.bgSecondary)
  || props.theme.chartSecondary};
`;

const Legend = ({ ...props }) => {
  let legend;
  if (props.type) {
    if (props.type === 1) {
      legend = (
        <Wrapper {...props}>
          <Square color="player_" />
            &nbsp;
          <Square color="rival_" />
          <Label>{props.playerName}</Label>
          <Square color="player" />
          &nbsp;
          <Square color="rival" />
          <Label>{props.rivalName}</Label>
        </Wrapper>
      );
    } else if (props.type === 2) {
      legend = (
        <Wrapper {...props}>
          <Square color="player_" />
          &nbsp;
          <Square color="player" />
          <Label>{props.playerName}</Label>
          <Square color="rival_" />
          &nbsp;
          <Square color="rival" />
          <Label>{props.rivalName}</Label>
        </Wrapper>
      );
    }
  } else {
    legend = (
      <Wrapper {...props}>
        <Square color="player" />
        <Label>{props.playerName}</Label>
        <Square color="rival" />
        <Label>{props.rivalName}</Label>
      </Wrapper>
    );
  }
  return legend;
};

export default Legend;
