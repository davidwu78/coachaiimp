import React from 'react';
import styled from 'styled-components';

import { ReactComponent as Facebook } from 'Themes/svgs/icon_fb.svg';
import { ReactComponent as Google } from 'Themes/svgs/icon_Google.svg';
import { ReactComponent as Line } from 'Themes/svgs/icon_LINE.svg';
import { ReactComponent as AlphaDown } from 'Themes/svgs/icon_sort-alpha-down.svg';
import { ReactComponent as AlphaUp } from 'Themes/svgs/icon_sort-alpha-up.svg';
import { ReactComponent as NumDown } from 'Themes/svgs/icon_sort-numeric-down-alt.svg';
import { ReactComponent as NumUp } from 'Themes/svgs/icon_sort-numeric-up-alt.svg';

import { ReactComponent as Building } from 'Themes/svgs/footer/building.svg';
import { ReactComponent as Envelope } from 'Themes/svgs/footer/envelope.svg';
import { ReactComponent as Telephone } from 'Themes/svgs/footer/telephone.svg';

import { ReactComponent as Badminton } from 'Themes/svgs/badminton.svg';
import { ReactComponent as Video } from 'Themes/svgs/video.svg';
import { ReactComponent as Search } from 'Themes/svgs/search.svg';
import { ReactComponent as Question } from 'Themes/svgs/question.svg';
import { ReactComponent as Tie } from 'Themes/svgs/tie.svg';
import { ReactComponent as Cross } from 'Themes/svgs/cross.svg';

const Main = styled.div`
  display: inline-block;
  position: relative;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  svg{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    ${(props) => props.fill && `fill: ${props.fill};`}
    ${(props) => props.white && 'fill: #fff;'}
  }

  path{
    ${(props) => props.fill && `fill: ${props.fill};`}
    ${(props) => props.white && 'fill: #fff;'}
  }
`;

const switchTypes = (type, size) => {
  switch (type) {
    case 'google':
      return <Google alt="logo" width={size} height={size} />;
    case 'facebook':
      return <Facebook alt="logo-fb" width={size} height={size} />;
    case 'line':
      return <Line alt="logo-line" width={size} height={size} />;
    case 'alphaDown':
      return <AlphaDown alt="logo-alpha-down" width={size} height={size} />;
    case 'alphaUp':
      return <AlphaUp alt="logo-alpha-up" width={size} height={size} />;
    case 'numDown':
      return <NumDown alt="logo-num-down" width={size} height={size} />;
    case 'numUp':
      return <NumUp alt="logo-num-up" width={size} height={size} />;
    case 'building':
      return <Building alt="logo-building" width={size} height={size} />;
    case 'envelope':
      return <Envelope alt="logo-envelope" width={size} height={size} />;
    case 'telephone':
      return <Telephone alt="logo-telephone" width={size} height={size} />;
    case 'badminton':
      return <Badminton alt="badminton" width={size} height={size} />;
    case 'video':
      return <Video alt="video" width={size} height={size} />;
    case 'search':
      return <Search alt="search" width={size} height={size} />;
    case 'question':
      return <Question alt="question" width={size} height={size} />;
    case 'tie':
      return <Tie alt="tie" width={size} height={size} />;
    case 'cross':
      return <Cross alt="cross" width={size} height={size} />;
    default:
      return undefined;
  }
};

const Icon = ({
  type, size = 18, white, fill
}) => (
  <Main size={size} fill={fill} white={white}>
    {switchTypes(type, size)}
  </Main>
);

export default Icon;
