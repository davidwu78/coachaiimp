import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import i18n from 'Language/i18n';
import { withTranslation } from 'react-i18next';
import styled from 'styled-components';
import { HashLink } from 'react-router-hash-link';
import Page from 'Themes/components/Page';
import BlockTitle from 'Themes/components/BlockTitle';
import Link from 'Themes/components/Link';
import topImage from 'Themes/pngs/single_Section1_bg.png';
import Graph from '../../Components/Graph';


const Top = styled.div`
  width: 100%;
  height: ${(window.innerWidth / 2880) * 720}px;
  background: no-repeat url(${topImage});
  background-size: 100%;
  background-position: top;
  box-sizing: border-box;
  padding: .3rem 10%;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const Tab = styled.button`
  cursor: pointer;
  overflow: hidden;
  outline: none;
  border: solid 2px #e0e0e0;
  border-bottom-color: #fff;
  border-bottom-style: solid;
  border-bottom: 3px;
  background: #fff;
  padding: 5px 30px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  font-size: 20px;
  margin: 0;
  margin-right: 4px;
  position: relative;
  height: 44px;
  font-weight: ${(props) => (props.lng === 'en' ? 500 : 600)};
  ${(props) => props.select && `
    color: #3fbbc3;
    border-top-color: #3fbbc3;
    border-top-width: 3px;
    transform: scaleY(1.0454545) translate(0px, 1px);
    z-index: 1;
  `}

  :hover{
    color: #3fbbc3;
    border-top-color: #3fbbc3;
    border-top-width: 3px;
    transition: color 0.3s;
  }

  :focus{
    outline: none;
  }
`;

const Tabs = styled.div`
  display: flex;
  padding-bottom: 0;
`;

const Main = styled.div`
  width: 100%;
  border-radius: 10px;
  border-top-left-radius: 0;
  border-color: #e0e0e0;
  border-style: solid;
  border-width: 2px;
  background: ${(props) => props.theme.justWhite};
  overflow: hidden;
  height: fit-content;
  position: relative;
`;

const Content = styled.div`
  position: relative;
  overflow: hidden;
`;

const Wrapper = styled.div`
  width: 100%;
  padding: .3rem 2%;
  margin-bottom: 50px;
  color: ${(props) => props.theme.textDark};
`;

const TopItem = styled.div`
  flex: 1;
`;

const TopPlayers = styled.div`
  display: flex;
`;

const TopPlayer = styled.div`
  display: block;
  flex: 1;
  padding: 20px 0;
  ${(props) => (props.player && `
    border-right: solid 1px #fff;
  `)}

  .top-player-name{
    color: ${(props) => (props.player ? props.theme.chartPrimary : props.theme.chartSecondary)};
    font-weight: 600;
    font-size: 23px;
    width: fit-content;
    padding: 5px 0;
    margin: auto;
  }
  .top-status{
    margin: auto;
    font-size: 20px;
    width: fit-content;
    color: #fff;
  }
`;

const TopItems = styled.div`
  display: flex;
  width: 100%;

  .top-container{
    display: block;
    width: fit-content;
    margin: auto;
  }

  .top-match{
    font-weight: 600;
    color: #fff;
    font-size: 42px;
    padding: 8px 0;
    display: flex;
    align-items: center;
  }

  .top-place-round{
    color: #fff;
    font-size: 28px;
    padding-bottom: 8px;

  }

  .top-date{
    color: #fff;
    font-size: 20px;
    margin-right: auto;
  }
`;

const Jump = styled(HashLink)`
  display: flex;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 15px;
  width: fit-content;
  text-decoration: none;
  color: #000;

  span{
    padding-left: 10px;
  }

  :hover{
    text-decoration: none;
    color: #3fbbc3;
  }
`;

const JumpBox = styled.div`
  flex: 1;
  display: flex;
  padding-top: 8px;
  padding-bottom: 20px;
  font-size: ${(props) => (props.lng === 'en' ? '16px' : '17px')};
`;

const JumpWrapper = styled.div`
  text-align: left;
  margin-left: auto;
  margin-right: auto;
`;

const JumpTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding-top: 19px;
  padding-bottom: 5px;
  margin-bottom: 10px;
  color: #15545e;
  display: flex;

  span{
    margin-left: auto;
    margin-right: auto;
    border-bottom: solid 2px #3fbbc3;
    padding: 0 20px;
    padding-bottom: 10px;
}
`;

const Back = styled(Link)`
  color: #15545e;
  font-size: 18px;
  font-weight: 600;
  :hover{
    opacity: 0.8;
    transition: all 0.5s;
  }
`;

const mapStateToProps = (state) => ({
  currentUser: state.user
});

class Single extends Component {
  constructor(props) {
    super(props);
    const { matchInfo } = props.match.params;
    const info = matchInfo.split('&');
    info[3] = moment(info[3]).format('YYYY / MM / DD');
    this.state = {
      idToken: "103235926321821091411",
      matchId: 302,
      matchData: {},
      tab: 2,
      matchInfo: info,
      replayList: {}
    };
    this.getAllMatchData = this.getAllMatchData.bind(this);
    this.clickSetButton = this.clickSetButton.bind(this);
    this.setReplayList = this.setReplayList.bind(this);
  }
  componentDidMount() {
    this.getAllMatchData().then(() => {
      this.setReplayList()
    })
      .catch((error) => {
        console.log(error);
      });
  }
  async setReplayList() {
    const { idToken } = this.state;
    const { matchId } = this.state;
    const { matchData } = this.state;
    const { rally_count } = matchData;
    let replayList = {};
    for (const key of Object.keys(rally_count)) {
      const [startRally, endRally] = [
        rally_count[key][0],
        rally_count[key][rally_count[key].length - 1],
      ];
      const info = `match_id=${matchId}&set=${key}&start=${startRally}&end=${endRally}`;
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL_SPEED}/result?id_token=${idToken}`,
          info
        );

        if (response.status !== 200 || response.data.msg.info !== "ok") {
          this.setState({ statusText: "Please choose another range..." });
          throw Error(response.statusText);
        } else {
          const {
            data: { msg: playerData, court_data: positionData },
          } = response;
          //create new object to store data, use key as set number and each set has playerData and positionData
          replayList = {
            ...replayList,
            [key]: { playerData, positionData },
          };
        }
      } catch (error) {
        console.log(error);
      }
    }
    this.setState({ replayList });
  }

  async getAllMatchData() {
    const { idToken } = this.state;
    
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL_SPEED}/data?id_token=${idToken}`);
      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      const { matchName } = this.props.match.params;
      this.setState({ matchData: response.data[matchName][0] });
    } catch (error) {
      console.log(error);
    }
  }
  async clickSetButton(tab) {
    await this.setState({ tab: tab });
  }
  render() {
    const {
      matchData,
      tab,
      matchInfo,
      speedTargetSet,
      ballType,
      replayList
    } = this.state;
    const { matchId, matchName } = this.props.match.params;
    const { t } = this.props;
    
    return (
      <div>
        <Page>
          <Wrapper>
            <div style={{ fontSize: '21px' }}>
              <BlockTitle>{t('single.analysis')}</BlockTitle>
            </div>
            <Tabs>
              <Tab
                select={tab === 2}
                key={`tab-${2}`}
                onClick={() => { this.clickSetButton(2); }}
                lng={i18n.language}
              >
                {t('single.scoreAnalysis')}
              </Tab>
            </Tabs>
            <Main>
              
              <Content style={{ height: tab === 2 ? 'auto' : '0' }}>
                <Graph
                  matchId={matchId}
                  playerName={matchInfo[4]}
                  rivalName={matchInfo[5]}
                  sets={matchData.set}
                  display={tab === 2}
                />
              </Content>
            </Main>
          </Wrapper>
        </Page>
      </div>
    );
  }
}

export default withTranslation()(Single);
