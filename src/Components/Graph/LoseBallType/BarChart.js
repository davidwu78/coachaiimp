import React, { PureComponent } from 'react';
import { Bar } from 'react-chartjs-2';
import { withTranslation } from 'react-i18next';

class BarChart extends PureComponent {
  constructor(props) {
    super(props);
    this.LEN_DATA = 5;
    this.formatXAxisData = this.formatXAxisData.bind(this);
  }
  formatXAxisData(data) {
    if (Object.keys(data).length === this.LEN_DATA) {
      return [data['出界'], data['對手落地致勝'], data['落點判斷失誤'], data['掛網'], data['未過網']];
    }
    return new Array(this.LEN_DATA).fill(0);
  }
  render() {
    const {
      playerData, rivalData, playerName, rivalName, t
    } = this.props;
    const xPlayerAxisData = this.formatXAxisData(playerData);
    const xRivalAxisData = this.formatXAxisData(rivalData);
    const barData = {
      // labels: ['出界', '對手落地致勝', '落點判斷失誤', '掛網', '未過網'],
      labels: [t('single.graph.loseType.out'), t('single.graph.loseType.opLand'), t('single.graph.loseType.misjudge'), t('single.graph.loseType.touchNet'), t('single.graph.loseType.notOverNet')],
      datasets: [
        {
          label: playerName,
          backgroundColor: 'rgb(255, 204, 37)',
          borderColor: 'rgb(255, 204, 37)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 204, 37,0.6)',
          hoverBorderColor: 'rgba(255, 204, 37, 1)',
          data: xPlayerAxisData
        },
        {
          label: rivalName,
          backgroundColor: 'rgb(67, 219, 229)',
          borderColor: 'rgba(67, 219, 229)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(67, 219, 229,0.6)',
          hoverBorderColor: 'rgba(67, 219, 229,1)',
          data: xRivalAxisData
        }
      ]
    };
    const barOptions = {
      maintainAspectRatio: true,
      responsive: true,
      title: {
        display: false,
        fontSize: 18
      },
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            fontSize: 12,
            min: 0,
            max: Math.max(...xPlayerAxisData, ...xRivalAxisData)
          },
          scaleLabel: {
            display: false,
            labelString: ''
          }
        }],
        xAxes: [{
          ticks: {
            fontFamily: 'Poppins'
          },
          gridLines: {
            display: false
          }
        }]
      }
    };
    return (
      <Bar
        data={barData}
        width={200}
        height={60}
        options={barOptions}
      />
    );
  }
}

export default withTranslation()(BarChart);
