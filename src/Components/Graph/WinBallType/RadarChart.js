import React, { PureComponent } from 'react';
import { Radar } from 'react-chartjs-2';
import { withTranslation } from 'react-i18next';

class RadarChart extends PureComponent {
  constructor(props) {
    super(props);
    this.yAxisData = ['網前球', '推撲球', '挑球', '平球', '接殺防守', '切球', '殺球', '長球', '發短球', '發長球'];
    this.formatXAxisData = this.formatXAxisData.bind(this);
  }
  formatXAxisData(data) {
    const { length } = this.yAxisData;
    const xAxisData = [];
    if (Object.keys(data).length === length) {
      for (let i = 0; i < length; i += 1) {
        const key = this.yAxisData[i];
        xAxisData.push(data[key]);
      }
      return xAxisData;
    }
    return new Array(length).fill(0);
  }
  render() {
    const {
      data, playerName, player, max, t
    } = this.props;
    const xAxisData = this.formatXAxisData(data);
    const color = player ? 'rgb(255, 204, 37)' : 'rgb(67, 219, 229)';
    const lightColor = player ? 'rgb(255, 204, 37, 0.6)' : 'rgb(67, 219, 229, 0.6)';
    const displayY = [
      t('single.graph.ballType.netShot'),
      t('single.graph.ballType.netPush'),
      t('single.graph.ballType.netPop'),
      t('single.graph.ballType.drive'),
      t('single.graph.ballType.smashDefense'),
      t('single.graph.ballType.dropShot'),
      t('single.graph.ballType.smash'),
      t('single.graph.ballType.clear'),
      t('single.graph.ballType.shortServe'),
      t('single.graph.ballType.longServe')
    ];
    const radarData = {
      labels: displayY,
      datasets: [
        {
          label: playerName,
          fill: true,
          cubicInterpolationMode: 'monotone',
          backgroundColor: lightColor,
          borderColor: color,
          pointBorderColor: '#fff',
          pointBackgroundColor: color,
          pointRadius: 5,
          pointHitRadius: 9,
          data: xAxisData
        }
      ]
    };
    const radarOptions = {
      maintainAspectRatio: true,
      responsive: true,
      title: {
        display: false,
        text: `${playerName} 獲勝球種`,
        fontSize: 18
      },
      legend: {
        display: false,
        labels: {
          fontColor: 'rgba(248, 184, 82, 1)',
          fontSize: 16
        }
      },
      scale: {
        ticks: {
          min: 0,
          stepSize: 1,
          max: max
        },
        pointLabels: {
          fontSize: 14,
          fontFamily: 'Poppins'
        }
      },
      tooltips: {
        callbacks: {
          title: (tooltipItem, chartData) => {
            const tootipTitle = chartData.labels[tooltipItem[0].index] || '';
            return tootipTitle;
          }
        }
      }
    };
    return (
      <Radar
        data={radarData}
        width={800}
        height={600}
        options={radarOptions}
      />
    );
  }
}

export default withTranslation()(RadarChart);
