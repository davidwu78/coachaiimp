/* eslint-disable */

/* 
 * Caution!
 * These graph functions is the same as the original version.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import styled from 'styled-components';

import imgCourt from './badminton_court.jpg';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;

const Chart = styled.div`
  width: 50%;
`;

const mapStateToProps = (state) => ({
  currentUser: state.user
});

class LoseDistribution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowHeight: undefined,
      windowWidth: undefined
    }
    this.init_court_distribution = this.init_court_distribution.bind(this);
    this.data_filter = this.data_filter.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
    const { matchId } = this.props;
    this.init_court_distribution(matchId);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.set !== prevProps.set
      || prevState.windowHeight !== this.state.windowHeight
      || prevState.windowWidth !== this.state.windowWidth
      || this.props.display !== prevProps.display) {
      const { matchId } = this.props;
      this.init_court_distribution(matchId);
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  handleResize() {
    this.setState({
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth
    });
  }
  async init_court_distribution(matchId) {
    const oriw = 930;
    const orih = 450;
    var Aelement= document.getElementById("total_court_chartA");
    if (Aelement) Aelement.remove();
    var Belement = document.getElementById("total_court_chartB");
    if (Belement) Belement.remove();

    const imgA = document.getElementById("badminton_courtA");
    if (imgA === null)
      return;
    var canv = document.createElement('canvas');
    canv.id = 'total_court_chartA';
    canv.width = imgA.width;
    canv.height = orih / oriw * imgA.width;
    document.getElementById("total_court").getElementsByClassName("playerA")[0].appendChild(canv);
    var canvA = document.getElementById("total_court_chartA");
    canvA.style.position = "absolute";
    canvA.style.left = imgA.offsetLeft + 'px';
    canvA.style.top = imgA.Top + 'px';

    var imgB = document.getElementById("badminton_courtB");
    var canv = document.createElement('canvas');
    canv.id = 'total_court_chartB';
    canv.width = imgB.width;
    canv.height = orih / oriw * imgB.width;
    document.getElementById("total_court").getElementsByClassName("playerB")[0].appendChild(canv);
    var canvB = document.getElementById("total_court_chartB");
    canvB.style.position = "absolute";
    canvB.style.left = imgB.offsetLeft + 'px';
    canvB.style.top = imgB.Top + 'px';

    var ctxA = canvA.getContext("2d");
    var ctxB = canvB.getContext("2d");

    let data, dataA, dataB;
    let { set } = this.props;
    let minrally = undefined;
    let maxrally = undefined;
    const { idToken } = this.props.currentUser;
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/count?match=${matchId}&id_token=${idToken}`);
      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      data = response.data;
    } catch (error) {
      console.log(error);
      return;
    }
    [data, set, minrally, maxrally] = this.data_filter(data, set, minrally, maxrally, 1);
    dataB = data.filter(function(item){
      return item.winner == 'A'
    });
    dataA = data.filter(function(item){
      return item.winner == 'B'
    });

    //count each area
    var group_data = Object.keys(_.groupBy(data,"lose_area")).sort();
    group_data = group_data.filter((value) => {
      return value !== "NULL";
    });
    var sum_dataA = new Object();
    sum_dataA.area = group_data;
    sum_dataA.value = new Array(group_data.length).fill(0);
    sum_dataA.selfout = new Array(group_data.length).fill(0);
    var sum_dataB = new Object();
    sum_dataB.area = group_data;
    sum_dataB.value = new Array(group_data.length).fill(0);
    sum_dataB.selfout = new Array(group_data.length).fill(0);
    var sumA = 0;
    for(var i = 0;i < dataA.length;i++){
      for(var j = 0;j < group_data.length;j++){
        if (dataA[i].lose_area == group_data[j]){
          // if ((dataA[i].lose_area == '10' || dataA[i].lose_area == '11' || dataA[i].lose_area == '12' || dataA[i].lose_area == '13' || dataA[i].lose_area == '14' || dataA[i].lose_area == '15' || dataA[i].lose_area == '16') && dataA[i].on_off_court == '未過網'){
          //     sum_dataA.selfout[j] += 1;
          // }
          // if (dataA[i].on_off_court !== '未過網' && dataA[i].on_off_court !== '掛網'&& dataA[i].on_off_court != '犯規'){
          //     sum_dataA.value[j] += 1;
          // }
          // console.log(sum_dataA.value[j])
          sum_dataA.value[j] += 1;
          sumA++;
        }
      }
    }
    var sumB = 0;
    for(var i = 0;i < dataB.length;i++){
      for(var j = 0;j < group_data.length;j++){
        if (dataB[i].lose_area == group_data[j]){
          // if ((dataB[i].lose_area == '10' || dataB[i].lose_area == '11' || dataB[i].lose_area == '12' || dataB[i].lose_area == '13' || dataB[i].lose_area == '14' || dataB[i].lose_area == '15' || dataB[i].lose_area == '16') && dataB[i].on_off_court == '未過網'){
          //     sum_dataB.selfout[j] += 1;
          // }
          // if (dataB[i].on_off_court !== '未過網' && dataB[i].on_off_court !== '掛網'&& dataB[i].on_off_court != '犯規'){
          //     sum_dataB.value[j] += 1;
          // }
          sum_dataB.value[j] += 1;
          // console.log(sum_dataB.value[j])
          sumB++;
        }
      }
    }
    var court = new Object();
    var coord_orix = 935;
    var coord_oriy = 424;
    var brutew = 61 / oriw * canvA.width;
    var bruteh = 41 / orih * canvA.height;
    court.xarea = ['1', '2', '7', '10', '16', '5', '6', '8', '11', '15', '3', '4', '9', '12', '14', '13'];
    court.yarea = ['7', '8', '9', '13', '1', '3', '5', '2', '4', '6', '14', '15', '16', '10', '11', '12'];
    court.xcoord_back = [[307, 468], [307, 468], [307, 468], [307, 468], [307, 468], [74, 307], [74, 307], [74, 307], [74, 307], [74, 307], [0, 74], [0, 74], [0, 74], [-60, 74], [-60, 74], [-60, 0]];
    court.xcoord_back = court.xcoord_back.map(function(item){
      return [parseInt(item[0] / coord_orix * (canvA.width - 2* brutew) + brutew), parseInt(item[1] / coord_orix * (canvA.width - 2 * brutew) + brutew)];
    });
    court.ycoord_back = [[108, 316], [108, 316], [108, 316], [32, 392], [316, 392], [316, 392], [316, 392], [32, 108], [32, 108], [32, 108], [392, 500], [392, 500], [392, 500], [-50, 32], [-50, 32], [-50, 32]];
    court.ycoord_back = court.ycoord_back.map(function(item){
      return [parseInt(item[0] / coord_oriy * (canvA.height - 2 *bruteh) + bruteh), parseInt(item[1] / coord_oriy * (canvA.height - 2 * bruteh) + bruteh)];
    });

    court.xcoord_front = [[468, 629], [468, 629], [468, 629], [468, 629], [468, 629], [629, 861], [629, 861], [629, 861], [629, 861], [629, 861], [861, 935], [861, 935], [861, 935], [861, 995], [861, 995], [935, 995]];
    court.xcoord_front = court.xcoord_front.map(function(item){
      return [parseInt(item[0] / coord_orix * (canvB.width - 2 * brutew) + brutew), parseInt(item[1] / coord_orix * (canvB.width - 2 * brutew) + brutew)];
    });
    court.ycoord_front = [[108, 316], [108, 316], [108, 316], [32, 392], [32, 108], [32, 108], [32, 108], [316, 392], [316, 392], [316, 392], [-50, 32], [-50, 32], [-50, 32], [392, 500], [392, 500], [392, 500]];
    court.ycoord_front = court.ycoord_front.map(function(item){
      return [parseInt(item[0] / coord_oriy * (canvB.height - 2 * bruteh) + bruteh), parseInt(item[1] / coord_oriy * (canvB.height - 2 * bruteh) + bruteh)];
    });

    //render middle line on courtA and courtB
    ctxA.fillStyle = "rgb(0,0,0)";
    ctxA.fillRect(court.xcoord_back[0][1] - 2, court.ycoord_back[7][0], 4, court.ycoord_back[4][1] - court.ycoord_back[7][0]);
    ctxB.fillStyle = "rgb(0,0,0)";
    ctxB.fillRect(court.xcoord_back[0][1] - 2, court.ycoord_back[7][0], 4, court.ycoord_back[4][1] - court.ycoord_back[7][0]);

    //render rectangle ratio area over image
    for(var i = 0;i < sum_dataA.value.length;i++){
      if (sum_dataA.value[i] != 0){
        var ratio = (sum_dataA.value[i] / sumA).toFixed(2);
        var idx = court.xarea.indexOf(sum_dataA.area[i]);
        var idy = court.yarea.indexOf(sum_dataA.area[i]);
        var topX, topY, w, h;
        //out-field ball will on opposite field
        // console.log(idx)
        // console.log(sum_dataA.area[i])
        if (set % 2 == 1){
          if (sum_dataA.area[i] == '10' || sum_dataA.area[i] == '11' || sum_dataA.area[i] == '12' || sum_dataA.area[i] == '13' || sum_dataA.area[i] == '14' || sum_dataA.area[i] == '15' || sum_dataA.area[i] == '16'){
            topX = court.xcoord_front[idx][0];
            topY = court.ycoord_front[idy][0];
            w = court.xcoord_front[idx][1] - court.xcoord_front[idx][0];
            h = court.ycoord_front[idy][1] - court.ycoord_front[idy][0];
          }
          else{
            topX = court.xcoord_back[idx][0];
            topY = court.ycoord_back[idy][0];
            w = court.xcoord_back[idx][1] - court.xcoord_back[idx][0];
            h = court.ycoord_back[idy][1] - court.ycoord_back[idy][0];
          }
        }
        else{

          if (sum_dataA.area[i] == '10' || sum_dataA.area[i] == '11' || sum_dataA.area[i] == '12' || sum_dataA.area[i] == '13' || sum_dataA.area[i] == '14' || sum_dataA.area[i] == '15' || sum_dataA.area[i] == '16'){
            topX = court.xcoord_back[idx][0];
            topY = court.ycoord_back[idy][0];
            w = court.xcoord_back[idx][1] - court.xcoord_back[idx][0];
            h = court.ycoord_back[idy][1] - court.ycoord_back[idy][0];
          }
          else{
            // console.log(court.xcoord_front)
            topX = court.xcoord_front[idx][0];
            topY = court.ycoord_front[idy][0];
            w = court.xcoord_front[idx][1] - court.xcoord_front[idx][0];
            h = court.ycoord_front[idy][1] - court.ycoord_front[idy][0];
          }
        }
        ctxA.fillStyle = "rgba(255, 204, 37," + (ratio+1) + ")"; // rgb(255, 204, 37)
        ctxA.fillRect(topX, topY, w, h);
        ctxA.fillStyle = "rgb(0,0,0)";
        ctxA.textAlign = "center";
        ctxA.textBaseline = "middle";
        ctxA.strokeText(ratio, topX + w / 2, topY + h / 2);
      }
      if (sum_dataA.selfout[i] != 0){
        var ratio = (sum_dataA.selfout[i] / sumA).toFixed(2);
        var idx = court.xarea.indexOf(sum_dataA.area[i]);
        var idy = court.yarea.indexOf(sum_dataA.area[i]);
        var topX,topY,w,h;
        if (set % 2 == 1){
          topX = court.xcoord_back[idx][0];
          topY = court.ycoord_back[idy][0];
          w = court.xcoord_back[idx][1] - court.xcoord_back[idx][0];
          h = court.ycoord_back[idy][1] - court.ycoord_back[idy][0];
        }
        else{
          topX = court.xcoord_front[idx][0];
          topY = court.ycoord_front[idy][0];
          w = court.xcoord_front[idx][1] - court.xcoord_front[idx][0];
          h = court.ycoord_front[idy][1] - court.ycoord_front[idy][0];
        }
        ctxA.fillStyle = "rgba(255, 204, 37," + (ratio+1) + ")"; // rgb(255, 204, 37)
        ctxA.fillRect(topX, topY, w, h);
        ctxA.fillStyle = "rgb(0,0,0)";
        ctxA.textAlign = "center";
        ctxA.textBaseline = "middle";
        ctxA.strokeText(ratio, topX + w / 2, topY + h / 2);
      }
    }
    for(var i = 0;i < sum_dataB.value.length;i++){
      if (sum_dataB.value[i] != 0){
          var ratio = (sum_dataB.value[i] / sumB).toFixed(2);
          var idx = court.xarea.indexOf(sum_dataB.area[i]);
          var idy = court.yarea.indexOf(sum_dataB.area[i]);
          var topX, topY, w, h;
          if(set % 2 == 1){
            if (sum_dataB.area[i] == '10' || sum_dataB.area[i] == '11' || sum_dataB.area[i] == '12' || sum_dataB.area[i] == '13' || sum_dataB.area[i] == '14' || sum_dataB.area[i] == '15' || sum_dataB.area[i] == '16'){
              topX = court.xcoord_back[idx][0];
              topY = court.ycoord_back[idy][0];
              w = court.xcoord_back[idx][1] - court.xcoord_back[idx][0];
              h = court.ycoord_back[idy][1] - court.ycoord_back[idy][0];
            }
            else{
              topX = court.xcoord_front[idx][0];
              topY = court.ycoord_front[idy][0];
              w = court.xcoord_front[idx][1] - court.xcoord_front[idx][0];
              h = court.ycoord_front[idy][1] - court.ycoord_front[idy][0];
            }
          }
          else{
            if (sum_dataB.area[i] == '10' || sum_dataB.area[i] == '11' || sum_dataB.area[i] == '12' || sum_dataB.area[i] == '13' || sum_dataB.area[i] == '14' || sum_dataB.area[i] == '15' || sum_dataB.area[i] == '16'){
              topX = court.xcoord_front[idx][0];
              topY = court.ycoord_front[idy][0];
              w = court.xcoord_front[idx][1] - court.xcoord_front[idx][0];
              h = court.ycoord_front[idy][1] - court.ycoord_front[idy][0];
            }
            else{
              topX = court.xcoord_back[idx][0];
              topY = court.ycoord_back[idy][0];
              w = court.xcoord_back[idx][1] - court.xcoord_back[idx][0];
              h = court.ycoord_back[idy][1] - court.ycoord_back[idy][0];
            }
        }
        ctxB.fillStyle = "rgba(67, 219, 229," + (ratio+1) + ")";  // rgb(67, 219, 229)
        ctxB.fillRect(topX, topY, w, h);
        ctxB.fillStyle = "rgb(0,0,0)";
        ctxB.textAlign = "center";
        ctxB.textBaseline = "middle";
        ctxB.strokeText(ratio, topX + w / 2, topY + h / 2);
      }
      if (sum_dataB.selfout[i] != 0){
        var ratio = (sum_dataB.selfout[i] / sumB).toFixed(2);
        var idx = court.xarea.indexOf(sum_dataB.area[i]);
        var idy = court.yarea.indexOf(sum_dataB.area[i]);
        var topX, topY, w, h;
        if (set % 2 == 1){
          topX = court.xcoord_front[idx][0];
          topY = court.ycoord_front[idy][0];
          w = court.xcoord_front[idx][1] - court.xcoord_front[idx][0];
          h = court.ycoord_front[idy][1] - court.ycoord_front[idy][0];
        }
        else{
          topX = court.xcoord_back[idx][0];
          topY = court.ycoord_back[idy][0];
          w = court.xcoord_back[idx][1] - court.xcoord_back[idx][0];
          h = court.ycoord_back[idy][1] - court.ycoord_back[idy][0];
        }
        ctxB.fillStyle = "rgba(67, 219, 229," + (ratio+1) + ")";  //rgb(67, 219, 229)
        ctxB.fillRect(topX, topY, w, h);
        ctxB.fillStyle = "rgb(0,0,0)";
        ctxB.textAlign = "center";
        ctxB.textBaseline = "middle";
        ctxB.strokeText(ratio, topX + w / 2, topY + h / 2);
      }
    }

  }
  data_filter(data, set, minrally, maxrally, mode) {
    set = parseInt(set, 10);
    if (set === 0) {
        let data_all = []; 
        for (let i = 0; i < data.length; i++) 
            data_all = data_all.concat(data[i].result);
        return [data_all,set,minrally,maxrally];
    }
    //init set
    if (!set){
        set = 1;
    }
    if (set === (data.length + 1)) {
        let data_tmp = data[0].result.concat(data[1].result);
        if (data.length === 3){
          data_tmp = data_tmp.concat(data[2].result);
        }

        data = data_tmp;
        return [data, set, minrally, maxrally];
    }
    //filter data to specific set
    data = data.filter(function(item) {
        return item.set === set
    });
    data = data[0].result;
    // init minrally and maxrally if are undefined,null,0,NaN,empty string,false
    if (!minrally) {
        minrally = Math.min.apply(Math, data.map(function(d) {
            return d.rally;
        }));
    }
    if (!maxrally) {
        maxrally = Math.max.apply(Math, data.map(function(d) {
            return d.rally;
        }));
    }
    if (mode === 1) {
        //filter data to specific interval
        data = data.filter(function(item) {
            return item.rally >= minrally && item.rally <= maxrally
        });
    }

    return [data, set, minrally, maxrally];
  }
  render() {
    return (
      <Wrapper id="total_court">
        <Chart className="playerA">
          <img id="badminton_courtA" src={imgCourt} width="100%" alt="court" />
        </Chart>
        <Chart className="playerB">
          <img id="badminton_courtB" src={imgCourt} className="img-fluid" width="100%" alt="court" />
        </Chart>
      </Wrapper>
    );
  }
}

export default connect(mapStateToProps)(LoseDistribution);
