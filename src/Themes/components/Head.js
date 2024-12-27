import React from 'react';
import styled from 'styled-components';

import AndersANTONSEN from 'Themes/pngs/players/Anders ANTONSEN.png';
import AnthonySinisukaGINTING from 'Themes/pngs/players/Anthony Sinisuka GINTING.png';
import CHENLong from 'Themes/pngs/players/CHEN Long.png';
import CHENYufei from 'Themes/pngs/players/CHEN Yufei.png';
import JonatanCHRISTIE from 'Themes/pngs/players/Jonatan CHRISTIE.png';
import KentoMOMOTA from 'Themes/pngs/players/Kento MOMOTA.png';
import KhositPHETPRADAB from 'Themes/pngs/players/Khosit PHETPRADAB.png';
import NGKaLongAngus from 'Themes/pngs/players/NG Ka Long Angus.png';
import PUSARLAVSindhu from 'Themes/pngs/players/PUSARLA V. Sindhu.png';
import SHIYuqi from 'Themes/pngs/players/SHI Yuqi.png';
import TAITzuYing from 'Themes/pngs/players/TAI Tzu Ying.png';
import ViktorAXELSEN from 'Themes/pngs/players/Viktor AXELSEN.png';
import WANGTzuWei from 'Themes/pngs/players/WANG Tzu Wei.png';
import CHOUTienChen from 'Themes/pngs/players/CHOU Tien Chen.png';

const Outline = styled.div`
  width: ${(props) => (`${props.size + 30}px` || '210px')};
  height: ${(props) => (`${props.size + 30}px` || '210px')};
  position: relative;
  border-radius: 50%;
  margin: auto;
  border: solid 1px ${(props) => ((props.player && '#ffcc25') || '#43dbe5')};
`;

const Wrapper = styled.div`
  width: ${(props) => (`${props.size}px` || '200px')};
  height: ${(props) => (`${props.size}px` || '200px')};
  overflow: hidden;
  position: relative;
  border-radius: 50%;
  margin: auto;
  ${(props) => props.outline && `
    transform: translate(0px,  15px);
  `}
`;

const Main = styled.img`
  position: absolute;
  top: 0;
  bottom: 0;
  width: ${(props) => (`${props.size}px` || '200px')};
  height: ${(props) => (`${props.size}px` || '200px')};
`;

const switchName = (name, size) => {
  switch (name) {
    case 'Anders ANTONSEN':
      return <Main size={size} src={AndersANTONSEN} />;
    case 'Anthony Sinisuka GINTING':
      return <Main size={size} src={AnthonySinisukaGINTING} />;
    case 'CHEN Long':
      return <Main size={size} src={CHENLong} />;
    case 'CHEN Yufei':
      return <Main size={size} src={CHENYufei} />;
    case 'Jonatan CHRISTIE':
      return <Main size={size} src={JonatanCHRISTIE} />;
    case 'Kento MOMOTA':
      return <Main size={size} src={KentoMOMOTA} />;
    case 'Khosit PHETPRADAB':
      return <Main size={size} src={KhositPHETPRADAB} />;
    case 'NG Ka Long Angus':
      return <Main size={size} src={NGKaLongAngus} />;
    case 'PUSARLA V. Sindhu':
      return <Main size={size} src={PUSARLAVSindhu} />;
    case 'SHI Yuqi':
      return <Main size={size} src={SHIYuqi} />;
    case 'TAI Tzu Ying':
      return <Main size={size} src={TAITzuYing} />;
    case 'Viktor AXELSEN':
      return <Main size={size} src={ViktorAXELSEN} />;
    case 'WANG Tzu Wei':
      return <Main size={size} src={WANGTzuWei} />;
    case 'CHOU Tien Chen':
      return <Main size={size} src={CHOUTienChen} />;
    default:
      return undefined;
  }
};

const Head = ({
  name, size, outline, player, ...props
}) => (
  outline ? (
    <Outline size={size} player={player}>
      <Wrapper size={size} outline {...props}>
        {switchName(name, size)}
      </Wrapper>
    </Outline>
  ) : (
    <Wrapper size={size} outline={false} {...props}>
      {switchName(name, size)}
    </Wrapper>
  )
);

export default Head;
