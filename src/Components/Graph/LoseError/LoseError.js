import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import BarChart from './BarChart';

const CenterText = styled.div`
  width: 100%;
  text-align: center;
  padding: 10px 0;
`;

const Wrapper = styled.div`
  width: 100%;
  text-align: center;
  padding: 30px;
  background: #f5fafa;
  box-sizing: border-box;
`;

const mapStateToProps = (state) => ({
  currentUser: state.user
});

class LoseError extends Component {
  static filteredByPlayer(data, targetPlayer) {
    const filteredData = data.map((setData) => {
      const newResult = setData.result.filter((rallyData) => {
        const { winner } = rallyData;
        // we should keep player who lose point in the rally
        if (winner !== targetPlayer) {
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
        受迫性失誤: 0,
        非受迫性失誤: 0
      },
      playerDataB: {
        受迫性失誤: 0,
        非受迫性失誤: 0
      }
    };
    this.forcedError = 0;
    this.unforcedError = 1;
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
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/count?match=${matchId}&id_token=${idToken}`);
      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      const filteredData = this.filteredBySet(response.data);
      const dataPlayerA = LoseError.filteredByPlayer(filteredData, 'A');
      const dataPlayerB = LoseError.filteredByPlayer(filteredData, 'B');
      this.calculateGraphData(dataPlayerA, 'A');
      this.calculateGraphData(dataPlayerB, 'B');
    } catch (error) {
      console.log(error);
    }
  }
  calculateGraphData(data, playerID) {
    const loseErrorData = {
      受迫性失誤: 0,
      非受迫性失誤: 0
    };
    data.forEach((setData) => {
      setData.result.forEach((rallyData) => {
        const loseError = rallyData.error;
        if (loseError === this.forcedError) {
          loseErrorData['受迫性失誤'] += 1;
        } else if (loseError === this.unforcedError) {
          loseErrorData['非受迫性失誤'] += 1;
        }
      });
    });
    if (playerID === 'A') {
      this.setState({ playerDataA: loseErrorData });
    } else if (playerID === 'B') {
      this.setState({ playerDataB: loseErrorData });
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
    const dataAsum = Object.values(playerDataA).reduce((acc, cur) => acc + cur, 0);
    const dataBsum = Object.values(playerDataB).reduce((acc, cur) => acc + cur, 0);
    if (Object.keys(playerDataA).length > 0
    && Object.keys(playerDataB).length > 0
    && dataAsum > 0 && dataBsum > 0) {
      return (
        <Wrapper>
          <BarChart
            playerData={playerDataA}
            rivalData={playerDataB}
            playerName={playerName}
            rivalName={rivalName}
          />
        </Wrapper>
      );
    }
    return (<CenterText>Loading...</CenterText>);
  }
}

export default connect(mapStateToProps)(LoseError);
