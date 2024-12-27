import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import styled from "styled-components";
import i18n from "Language/i18n";
import { withTranslation } from "react-i18next";
import Row from "Themes/components/Row";
import Select from "Themes/components/Select";
import BlockTitle from "Themes/components/BlockTitle";
import Legend from "Themes/components/Legend";
import Auth from "Components/Auth";
import Icon from "Themes/components/Icon";
import Button from "Themes/components/Button";
import Tooltip from "Themes/components/Tooltip";
import VideoPlayer from "../BallType/BallType/VideoPlayer";

const mapStateToProps = (state) => ({
  currentUser: state.user,
});
const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;
const ReplayOptions = styled.div`
  width: 40%;
`;
const LastShotPositionStat = styled.div`
  width: 60%;
`;
const CenterText = styled.div`
  width: 100%;
  text-align: center;
  padding: 10px 0;
`;
const Controller = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

  .controller-block {
    width: 70%;
    padding: 5px 10px;
  }
  .controller-block:nth-child(1) {
    width: 30%;
    padding: 5px 10px;
  }
`;
const VideoButton = styled(Button)`
  padding: 5px 10px;
  display: flex;
  align-items: center;
  margin: auto;
  font-size: 18px;
  span {
    padding-left: 5px;
  }
`;
const Table = styled.table`
  width: 100%;
  font-weight: normal;
  border: solid 1px #cccccc;
  thead th {
    text-align: center;
    border: solid 1px #cccccc;
  }
  tbody tr:nth-child(odd) td,
  tbody tr:nth-child(odd) th {
    background: #f7f7f7;
  }

  tbody tr:nth-child(3) td:nth-last-child(1),
  tbody tr:nth-child(3) td:nth-last-child(2),
  tbody tr:nth-child(7) td:nth-last-child(3),
  tbody tr:nth-child(7) td:nth-last-child(4),
  tbody tr:nth-child(11) td:nth-last-child(1),
  tbody tr:nth-child(11) td:nth-last-child(2){
    background: #ffffff;
  }

  tbody tr:nth-child(1) {
    border-top: solid 1px #cccccc;
  }

  tbody tr:nth-child(7) {
    border-top: solid 1px #cccccc;
  }

  tbody tr,
  tbody th {
    border-left: solid 1px #cccccc;
    border-right: solid 1px #cccccc;
  }

  tbody tr td {
    text-align: center;
    border-right: solid 1px #cccccc;
  }

  th, td {
    padding: .3rem .2rem;
  }

  tfoot tr td {
    border-top: solid 1px #cccccc;
    font-weight
  }

  .is-red-indicated {
    box-shadow: 5px 0 0 #cf1322 inset;
  }

  .is-yellow-indicated {
    box-shadow: 5px 0 0 #d4b106 inset;
  }
`;
const checkPosition = (x, y) => {
  if (
    (x > 138.78 && y > 304.85 && x < 300.3 && y < 410.41) ||
    (x < 138.78 && y < 304.85 && x > 22.75 && y > 199.29)
  ) {
    return "右前";
  } else if (
    (x < 138.78 && y > 304.85 && x > 22.75 && y < 410.41) ||
    (x > 138.78 && y < 304.85 && x < 300.3 && y > 199.29)
  ) {
    return "左前";
  } else if (
    (x > 138.78 && y > 549.3 && x < 300.3 && y < 632.45) ||
    (x < 138.78 && y < 60.4 && x > 22.75 && y > 22.75)
  ) {
    return "右後";
  } else if (
    (x < 138.78 && y > 549.3 && x > 22.75 && y < 632.45) ||
    (x > 138.78 && y < 60.4 && x < 300.3 && y > 22.75)
  ) {
    return "左後";
  } else if (
    (x > 138.78 && y > 410.41 && x < 300.3 && y < 549.3) ||
    (x < 138.78 && y < 199.29 && x > 22.75 && y > 60.4)
  ) {
    return "右中";
  } else if (
    (x < 138.78 && y > 410.41 && x > 22.75 && y < 549.3) ||
    (x > 138.78 && y < 199.29 && x < 300.3 && y > 60.4)
  ) {
    return "左中";
  }

  return null;
};

const time2sec = (timeStr) =>
  timeStr.split(":").reduce((totol, cur) => totol * 60 + Number(cur), 0);
class Replayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replayList: {},
      playerStats: {},
      videoList: [],
      autoPlay: true,
      show: false,
      player: "A",
      direction: "右",
      position: "前",
      ballNum: 5,
      scoreType: "all",
      noData: false,
    };
    this.setReplayList = this.setReplayList.bind(this);
    this.setVideoList = this.setVideoList.bind(this);
    this.setPlayer = this.setPlayer.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.setDirection = this.setDirection.bind(this);
    this.setBallNum = this.setBallNum.bind(this);
    this.setScoreType = this.setScoreType.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.replayList !== prevProps.replayList && this.props.replayList) {
      this.setReplayList(this.props.replayList);
    }
  }
  setPlayer(e) {
    this.setState({ player: e.target.value });
  }
  setPosition(e) {
    this.setState({ position: e.target.value });
  }
  setDirection(e) {
    this.setState({ direction: e.target.value });
  }
  setBallNum(e) {
    this.setState({ ballNum: e.target.value });
  }
  setScoreType(e) {
    this.setState({ scoreType: e.target.value });
  }

  setVideoList() {
    const { replayList, player, direction, position, scoreType, ballNum } =
      this.state;
    // console.log(player, position, scoreType, ballNum)
    // nowPlayer用來記錄現在要找的球員，假設A得分找A的球，A失分找B的球
    // select_player用來記錄目前使用者選定的目標球員
    const videoList = [];
    const countPosition = direction + position;
    const selectPlayerIndex = "player" + player;
    for (let i = 0; i < replayList["getpoint_player"].length; i++) {
      if (replayList["video_data"]["last_hit"][i] !== player) {
        continue;
      }
      //如果是得分，但是球員不是現在要找的球員，或者是失分，但是球員是現在要找的球員，就跳過
      if (scoreType !== "all") {
        if (
          (scoreType === "score" &&
            replayList["getpoint_player"][i] !== player) ||
          (scoreType === "loseScore" &&
            replayList["getpoint_player"][i] === player)
        ) {
          continue;
        }
      }
      const x = replayList["video_data"][selectPlayerIndex + "_position"][i][0];
      const y = replayList["video_data"][selectPlayerIndex + "_position"][i][1];

      if (checkPosition(x, y) !== countPosition) {
        continue;
      }
      if (replayList["video_data"]["time"][i].length <= ballNum) {
        const video = {
          startTime: time2sec(replayList["video_data"]["time"][i][0]) - 0.2,
          endTime:
            time2sec(
              replayList["video_data"]["time"][i][
              replayList["video_data"]["time"][i].length - 1
              ]
            ) + 2,
          title: `Set ${replayList["video_data"]["set"][i]} Rally ${replayList["video_data"]["rally"][i]} ${replayList["video_data"]["playerA_score"][i]}-${replayList["video_data"]["playerB_score"][i]}`,
        };
        videoList.push(video);
      } else {
        let frameNum = replayList["video_data"]["time"][i].length - 1;
        const video = {
          startTime:
            time2sec(
              replayList["video_data"]["time"][i][frameNum - ballNum + 1]
            ) - 0.2,
          endTime: time2sec(replayList["video_data"]["time"][i][frameNum]) + 2,
          title: `Set ${replayList["video_data"]["set"][i]} Rally ${replayList["video_data"]["rally"][i]} ${replayList["video_data"]["playerA_score"][i]}-${replayList["video_data"]["playerB_score"][i]}`,
        };
        videoList.push(video);
      }
    }
    if (videoList.length === 0) {
      this.setState({ videoList: videoList, show: false, noData: true });
    } else {
      this.setState({ videoList: videoList, show: true, noData: false });
    }
    // console.log("videoList", videoList);
  }
  setModal(show, title) {
    this.setState({ show: show, title: title });
  }


  async setReplayList(replayList) {
    const { matchData } = this.props;
    const replayResult = {
      getpoint_player: [],
      video_data: {
        time: [],
        playerA_position: [],
        set: [],
        rally: [],
        playerA_score: [],
        playerB_score: [],
        playerB_position: [],
        last_hit: [],
      },
    };
    let playerStats = {};
    //use result api to get the rally list
    for (const key of Object.keys(replayList)) {
      const {
        playerData, positionData
      } = replayList[key];
      let start_index = null;
      let score_count = 0;
      for (let i = 0; i < playerData.time.length; i++) {
        if (start_index === null) {
          start_index = i;
        }
        if (playerData.time[i] === null) {
          let player_time = [];
          for (
            let rally_index = start_index;
            rally_index < i;
            rally_index++
          ) {
            player_time.push(playerData.frame[rally_index]);
          }
          replayResult["getpoint_player"].push(
            playerData.getpoint_player[i - 1]
          );
          replayResult["video_data"]["time"].push(player_time);
          replayResult["video_data"]["set"].push(key);
          // console.log(replayResult)
          replayResult["video_data"]["playerA_score"].push(
            matchData.score_a[key][
            playerData["rally_count"][score_count] - 1
            ]
          );
          replayResult["video_data"]["playerB_score"].push(
            matchData.score_b[key][
            playerData["rally_count"][score_count] - 1
            ]
          );
          replayResult["video_data"]["playerA_position"].push([
            positionData["Ax"][i - 1],
            positionData["Ay"][i - 1],
          ]);
          replayResult["video_data"]["playerB_position"].push([
            positionData["Bx"][i - 1],
            positionData["By"][i - 1],
          ]);
          replayResult["video_data"]["rally"].push(
            playerData["rally_count"][score_count]
          );
          replayResult["video_data"]["last_hit"].push(
            playerData["player"][i - 1]
          );
          start_index = null;
          score_count++;
        }
      }
    }
    const uniqueSets = Array.from(new Set(replayResult.video_data.set));
    uniqueSets.forEach((set) => {
      // 初始化得分計數
      let scoreCount = {
        右前: { A: { gain: 0, lose: 0 }, B: { gain: 0, lose: 0 } },
        左前: { A: { gain: 0, lose: 0 }, B: { gain: 0, lose: 0 } },
        右後: { A: { gain: 0, lose: 0 }, B: { gain: 0, lose: 0 } },
        左後: { A: { gain: 0, lose: 0 }, B: { gain: 0, lose: 0 } },
        右中: { A: { gain: 0, lose: 0 }, B: { gain: 0, lose: 0 } },
        左中: { A: { gain: 0, lose: 0 }, B: { gain: 0, lose: 0 } },
      };
      // 找出一場比賽總共有幾個set
      const setIndexes = replayResult.video_data.set
        .map((s, index) => (s === set ? index : null))
        .filter((index) => index !== null);
      //according to the setIndexes, get the last hit of the set
      const setLastHit = setIndexes.map(
        (index) => replayResult.video_data.last_hit[index]
      );
      const setGetPointPlayer = setIndexes.map(
        (index) => replayResult.getpoint_player[index]
      );
      let playPosition = [];
      // 遍歷 set 中的每個擊球
      setLastHit.forEach((hit, index) => {
        hit === "A"
          ? (playPosition =
            replayResult.video_data.playerA_position[setIndexes[index]])
          : (playPosition =
            replayResult.video_data.playerB_position[setIndexes[index]]);
        // 繼續使用 checkPosition 函數判斷位置
        const position = checkPosition(playPosition[0], playPosition[1]);
        if (position) {
          if (hit === "A") {
            if (hit === setGetPointPlayer[index]) {
              scoreCount[position].A.gain++;
            } else {
              scoreCount[position].A.lose++;
            }
          } else if (hit === "B") {
            if (hit === setGetPointPlayer[index]) {
              scoreCount[position].B.gain++;
            } else {
              scoreCount[position].B.lose++;
            }
          }
        }
        //   console.log("index",index,"position", position, "hit", hit, "getpoint", setGetPointPlayer[index],"position", playPosition[0], playPosition[1])
      });
      // 將得分計數存入整合的物件中
      playerStats[set] = scoreCount;
    });
    this.setState({ replayList: replayResult, playerStats: playerStats });
    // console.log("replaylist", replayResult)
  }
  render() {
    const { t, matchData } = this.props;
    const {
      videoList,
      autoPlay,
      show,
      replayList,
      playerStats,
      player,
      direction,
      position,
      ballNum,
      scoreType,
      noData,
    } = this.state;
    const generatePlayerRows = (playerStats, player) => {
      const positions = ["右前", "左前", "右中", "左中", "右後", "左後"];
      // Calculate max gain
      var maxGain = -Infinity;
      positions.map((position) => {
        Object.keys(playerStats).map((set) => {
          maxGain = Math.max(maxGain, playerStats[set][position][player]["gain"]);
        })
      });

      // Calculate max lose
      var maxLose = -Infinity;
      positions.map((position) => {
        Object.keys(playerStats).map((set) => {
          maxLose = Math.max(maxLose, playerStats[set][position][player]["lose"]);
        })
      });

      return (
        <React.Fragment>
          <tr>
            <th rowSpan={6}>{matchData[player]}</th>
            <th>右前</th>
            {Object.keys(playerStats).map((set) => (
              <React.Fragment key={set}>
                <td className={`${playerStats[set]["右前"][player]["gain"] === maxGain ? "is-yellow-indicated" : ""} ${playerStats[set]["右前"][player]["gain"] === maxGain ? "is-yellow-indicated" : ""}`}>
                  {playerStats[set]["右前"][player]["gain"]}
                </td>
                <td className={`${playerStats[set]["右前"][player]["lose"] === maxLose ? "is-red-indicated" : ""} ${playerStats[set]["右前"][player]["lose"] === maxLose ? "is-red-indicated" : ""}`}>
                  {playerStats[set]["右前"][player]["lose"]}
                </td>
              </React.Fragment>
            ))}
            <td rowSpan={2}>
              {Object.values(playerStats).reduce(
                (sum, setStat) =>
                  sum +
                  setStat["右前"][player]["gain"] +
                  setStat["左前"][player]["gain"],
                0
              )}
            </td>
            <td rowSpan={2}>
              {Object.values(playerStats).reduce(
                (sum, setStat) =>
                  sum +
                  setStat["右前"][player]["lose"] +
                  setStat["左前"][player]["lose"],
                0
              )}
            </td>
            <td rowSpan={6}>
              {Object.values(playerStats).reduce(
                (sum, setStat) =>
                  sum +
                  Object.values(setStat).reduce(
                    (posSum, posStat) => posSum + posStat[player]["gain"],
                    0
                  ),
                0
              )}
            </td>
            <td rowSpan={6}>
              {Object.values(playerStats).reduce(
                (sum, setStat) =>
                  sum +
                  Object.values(setStat).reduce(
                    (posSum, posStat) => posSum + posStat[player]["lose"],
                    0
                  ),
                0
              )}
            </td>
          </tr>
          <tr>
            <th>左前</th>
            {Object.keys(playerStats).map((set) => (
              <React.Fragment key={set}>
                <td className={`${playerStats[set]["左前"][player]["gain"] === maxGain ? "is-yellow-indicated" : ""} ${playerStats[set]["左前"][player]["gain"] === maxGain ? "is-yellow-indicated" : ""}`}>
                  {playerStats[set]["左前"][player]["gain"]}
                </td>
                <td className={`${playerStats[set]["左前"][player]["lose"] === maxLose ? "is-red-indicated" : ""} ${playerStats[set]["左前"][player]["lose"] === maxLose ? "is-red-indicated" : ""}`}>
                  {playerStats[set]["左前"][player]["lose"]}
                </td>
              </React.Fragment>
            ))}
          </tr>
          <tr>
            <th>右中</th>
            {Object.keys(playerStats).map((set) => (
              <React.Fragment key={set}>
                <td className={`${playerStats[set]["右中"][player]["gain"] === maxGain ? "is-yellow-indicated" : ""} ${playerStats[set]["右中"][player]["gain"] === maxGain ? "is-yellow-indicated" : ""}`}>
                  {playerStats[set]["右中"][player]["gain"]}
                </td>
                <td className={`${playerStats[set]["右中"][player]["lose"] === maxLose ? "is-red-indicated" : ""} ${playerStats[set]["右中"][player]["lose"] === maxLose ? "is-red-indicated" : ""}`}>
                  {playerStats[set]["右中"][player]["lose"]}
                </td>
              </React.Fragment>
            ))}
            <td rowSpan={2}>
              {Object.values(playerStats).reduce(
                (sum, setStat) =>
                  sum +
                  setStat["右中"][player]["gain"] +
                  setStat["左中"][player]["gain"],
                0
              )}
            </td>
            <td rowSpan={2}>
              {Object.values(playerStats).reduce(
                (sum, setStat) =>
                  sum +
                  setStat["右中"][player]["lose"] +
                  setStat["左中"][player]["lose"],
                0
              )}
            </td>
          </tr>
          <tr>
            <th>左中</th>
            {Object.keys(playerStats).map((set) => (
              <React.Fragment key={set}>
                <td className={`${playerStats[set]["左中"][player]["gain"] === maxGain ? "is-yellow-indicated" : ""} ${playerStats[set]["左中"][player]["gain"] === maxGain ? "is-yellow-indicated" : ""}`}>
                  {playerStats[set]["左中"][player]["gain"]}
                </td>
                <td className={`${playerStats[set]["左中"][player]["lose"] === maxLose ? "is-red-indicated" : ""} ${playerStats[set]["左中"][player]["lose"] === maxLose ? "is-red-indicated" : ""}`}>
                  {playerStats[set]["左中"][player]["lose"]}
                </td>
              </React.Fragment>
            ))}
          </tr>
          <tr>
            <th>右後</th>
            {Object.keys(playerStats).map((set) => (
              <React.Fragment key={set}>
                <td className={`${playerStats[set]["右後"][player]["gain"] === maxGain ? "is-yellow-indicated" : ""} ${playerStats[set]["右後"][player]["gain"] === maxGain ? "is-yellow-indicated" : ""}`}>
                  {playerStats[set]["右後"][player]["gain"]}
                </td>
                <td className={`${playerStats[set]["右後"][player]["lose"] === maxLose ? "is-red-indicated" : ""} ${playerStats[set]["右後"][player]["lose"] === maxLose ? "is-red-indicated" : ""}`}>
                  {playerStats[set]["右後"][player]["lose"]}
                </td>
              </React.Fragment>
            ))}
            <td rowSpan={2}>
              {Object.values(playerStats).reduce(
                (sum, setStat) =>
                  sum +
                  setStat["右後"][player]["gain"] +
                  setStat["左後"][player]["gain"],
                0
              )}
            </td>
            <td rowSpan={2}>
              {Object.values(playerStats).reduce(
                (sum, setStat) =>
                  sum +
                  setStat["右後"][player]["lose"] +
                  setStat["左後"][player]["lose"],
                0
              )}
            </td>
          </tr>
          <tr>
            <th>左後</th>
            {Object.keys(playerStats).map((set) => (
              <React.Fragment key={set}>
                <td className={`${playerStats[set]["左後"][player]["gain"] === maxGain ? "is-yellow-indicated" : ""} ${playerStats[set]["左後"][player]["gain"] === maxGain ? "is-yellow-indicated" : ""}`}>
                  {playerStats[set]["左後"][player]["gain"]}
                </td>
                <td className={`${playerStats[set]["左後"][player]["lose"] === maxLose ? "is-red-indicated" : ""} ${playerStats[set]["左後"][player]["lose"] === maxLose ? "is-red-indicated" : ""}`}>
                  {playerStats[set]["左後"][player]["lose"]}
                </td>
              </React.Fragment>
            ))}
          </tr>
        </React.Fragment>
      );
    };

    if (Object.keys(replayList).length > 0) {
      return (
        <div>
          <Row>
            <BlockTitle>得失分站位回放</BlockTitle>
          </Row>
          <Wrapper>
            <ReplayOptions>
              <Row>
                <Controller>
                  <div className="controller-block">球員</div>
                  <div className="controller-block">
                    <Select value={player} onChange={this.setPlayer}>
                      <option value="A">{matchData["A"]}</option>
                      <option value="B">{matchData["B"]}</option>
                      {/* <option value="放小球">{t('single.ballType.lift.name')}</option> */}
                    </Select>
                  </div>
                </Controller>
              </Row>
              <Row>
                <Controller>
                  <div className="controller-block">得失分</div>
                  <div className="controller-block">
                    <Select value={scoreType} onChange={this.setScoreType}>
                      <option value="all">全部</option>
                      <option value="score">得分</option>
                      <option value="loseScore">失分</option>
                    </Select>
                  </div>
                </Controller>
              </Row>
              <Row>
                <Controller>
                  <div className="controller-block">球場方向</div>
                  <div className="controller-block">
                    <Select value={direction} onChange={this.setDirection}>
                      <option value="右">右</option>
                      <option value="左">左</option>
                    </Select>
                  </div>
                </Controller>
              </Row>
              <Row>
                <Controller>
                  <div className="controller-block">球場位置</div>
                  <div className="controller-block">
                    <Select value={position} onChange={this.setPosition}>
                      <option value="前">前</option>
                      <option value="中">中</option>
                      <option value="後">後</option>
                    </Select>
                  </div>
                </Controller>
              </Row>

              <Row>
                <Controller>
                  <div className="controller-block">拍數</div>
                  <div className="controller-block">
                    <Select value={ballNum} onChange={this.setBallNum}>
                      <option value="5">5</option>
                      <option value="3">3</option>
                      <option value="1">1</option>
                    </Select>
                  </div>
                </Controller>
              </Row>
            </ReplayOptions>
            <LastShotPositionStat>
              <Row>
                <Controller>
                  <Table>
                    <thead>
                      <tr>
                        <th scope="col" rowSpan={2}>
                          末拍擊球員
                        </th>
                        <th scope="col" rowSpan={2}>
                          擊球站位
                        </th>
                        {Object.keys(playerStats).map((set) => (
                          <th scope="col" colSpan={2} key={set}>
                            Set {set}
                          </th>
                        ))}
                        <th scope="col" colSpan={2}>
                          小計
                        </th>
                        <th scope="col" colSpan={2}>
                          合計
                        </th>
                      </tr>
                      <tr>
                        {Object.keys(playerStats).map((set) => (
                          <React.Fragment key={set}>
                            <th scope="col" key={set + "_gain"}>得</th>
                            <th scope="col" key={set + "_lose"}>失</th>
                          </React.Fragment>
                        ))}
                        <th scope="col">得</th>
                        <th scope="col">失</th>
                        <th scope="col">得</th>
                        <th scope="col">失</th>
                      </tr>
                    </thead>
                    <tbody>
                      {generatePlayerRows(playerStats, "A")}
                      {generatePlayerRows(playerStats, "B")}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={1000}>
                          選手單局最高得分站位以黃色標記，單局最高失分站位以紅色標記
                        </td>
                      </tr>
                    </tfoot>
                  </Table>
                </Controller>
              </Row>
            </LastShotPositionStat>
          </Wrapper>
          <Row>
            <VideoButton onClick={() => this.setVideoList(true)}>
              <Icon type="video" size={26} />
              <span>{t("watchVideo")}</span>
            </VideoButton>
            {/* <Tooltip>可觀看該局每分片段</Tooltip> */}
          </Row>
          {noData && (
            <row
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: 1,
                textAlign: "center",
                color: "red",
              }}
            >
              無符合條件資料
            </row>
          )}
          <Row>
            <VideoPlayer
              title={matchData[player]}
              show={show}
              onHide={() => this.setModal(false, "")}
              autoPlay={autoPlay}
              onAutoPlayChange={() => this.setState({ autoPlay: !autoPlay })}
              videos={videoList}
              videoUrl={`https://coachai.cs.nycu.edu.tw:55000/api/video/${matchData.id}?id_token=${Auth.getToken()}`}
            />
          </Row>
        </div>
      );
    }
    return (
      <Row>
        <CenterText>Loading...</CenterText>
      </Row>
    );
  }
}

export default withTranslation()(connect(mapStateToProps)(Replayer));
