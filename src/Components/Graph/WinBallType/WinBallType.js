import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import RadarChart from './RadarChart';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;

const Chart = styled.div`
  width: 50%;
`;

const CenterText = styled.div`
  width: 100%;
  text-align: center;
  padding: 10px 0;
`;

const mapStateToProps = (state) => ({
  currentUser: state.user
});

class WinBallType extends Component {
  static filteredByPlayer(data, targetPlayer) {
    const filteredData = data.map((setData) => {
      const newResult = setData.result.filter((rallyData) => {
        const { winner } = rallyData;
        if (winner === targetPlayer) {
          return true;
        }
        return false;
      });
      const newSetData = {
        result: newResult,
        set: setData.set
      };
      return newSetData;
    });
    return filteredData;
  }
  constructor(props) {
    super(props);
    this.state = {
      playerDataA: {
        網前球: 0,
        推撲球: 0,
        挑球: 0,
        平球: 0,
        接殺防守: 0,
        切球: 0,
        殺球: 0,
        長球: 0,
        發短球: 0,
        發長球: 0
      },
      playerDataB: {
        網前球: 0,
        推撲球: 0,
        挑球: 0,
        平球: 0,
        接殺防守: 0,
        切球: 0,
        殺球: 0,
        長球: 0,
        發短球: 0,
        發長球: 0
      }
    };
    this.getData = this.getData.bind(this);
    this.filteredBySet = this.filteredBySet.bind(this);
    this.calculateGraphData = this.calculateGraphData.bind(this);
  }
  componentDidMount() {
    const { matchId } = this.props;
    this.getData(matchId);
  }
  componentDidUpdate(prevProps) {
    if (this.props.set !== prevProps.set) {
      const { matchId } = this.props;
      this.getData(matchId);
    }
  }
  async getData(matchId) {
    const { idToken } = this.props.currentUser;
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/simple_count?match=${matchId}&id_token=${idToken}`);
      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      const filteredData = this.filteredBySet(response.data);
      const dataPlayerA = WinBallType.filteredByPlayer(filteredData, 'A');
      const dataPlayerB = WinBallType.filteredByPlayer(filteredData, 'B');
      this.calculateGraphData(dataPlayerA, 'A');
      this.calculateGraphData(dataPlayerB, 'B');
    } catch (error) {
      console.log(error);
    }
  }
  calculateGraphData(data, playerID) {
    const winBallTypeData = {
      網前球: 0,
      推撲球: 0,
      挑球: 0,
      平球: 0,
      接殺防守: 0,
      切球: 0,
      殺球: 0,
      長球: 0,
      發短球: 0,
      發長球: 0
    };
    data.forEach((setData) => {
      setData.result.forEach((rallyData) => {
        const { balltype } = rallyData;
        if (Object.prototype.hasOwnProperty.call(winBallTypeData, balltype)) {
          winBallTypeData[balltype] += 1;
        }
      });
    });
    if (playerID === 'A') {
      this.setState({ playerDataA: winBallTypeData });
    } else if (playerID === 'B') {
      this.setState({ playerDataB: winBallTypeData });
    }
  }
  filteredBySet(data) {
    const { set } = this.props;
    if (set === process.env.REACT_APP_ALL_SET) {
      return data;
    }
    return data.filter((element) => element.set === set);
  }
  render() {
    const {
      playerDataA,
      playerDataB
    } = this.state;
    const { playerName, rivalName } = this.props;
    const max = Math.max(...Object.values(playerDataA), ...Object.values(playerDataB));
    const dataAsum = Object.values(playerDataA).reduce((acc, cur) => acc + cur, 0);
    const dataBsum = Object.values(playerDataB).reduce((acc, cur) => acc + cur, 0);
    if (Object.keys(playerDataA).length > 0
    && Object.keys(playerDataB).length > 0
    && dataAsum > 0 && dataBsum > 0) {
      return (
        <Wrapper>
          <Chart>
            <RadarChart data={playerDataA} playerName={playerName} max={max} player />
          </Chart>
          <Chart>
            <RadarChart data={playerDataB} playerName={rivalName} max={max} />
          </Chart>
        </Wrapper>
      );
    }
    return (<CenterText>Loading...</CenterText>);
  }
}

export default connect(mapStateToProps)(WinBallType);
