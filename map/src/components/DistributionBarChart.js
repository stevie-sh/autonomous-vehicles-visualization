import React, {PureComponent} from 'react';
import {Bar, Line} from 'react-chartjs-2';
import {formatPathToChart} from '../utils';
import Spinner from './Spinner';
import {prop, map, countBy, values} from 'ramda';

const DistributionBarChart = ({paths, toggleThrottle,  isLoading, throttleMs}) => {
  const options = {
    legend: {
      display: false
    },
    scales: {
      xAxes : [{
        categoryPercentage: 1.0,
        barPercentage: 1.0,
        display: true
      }
      ],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }

  const data = {
    labels: ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '>= 70 (vroom)'],
    datasets: [
      {
        backgroundColor: 'rgba(255,99,132,1)',
        borderColor: 'rgba(255,99,132,1)',
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [10, 20, 30, 40]
      }
    ]
  };

  const createDistribution = (paths) => {
    const speeds = map(prop('speed'), paths); 
    const bucket = (num) => {
      if (num >= 70) return 7;
      return Math.floor(num/10);
    }

    const distribution = countBy(bucket, speeds);
    return distribution;
  }

  const dataP = values(createDistribution(paths));
  data.datasets[0].data = dataP.slice();

  const renderThrottleMessage = () => (
    <>
      <Spinner />
      <button onClick={toggleThrottle}>Slow down requests to see chart live!</button>
    </>
  )

  return (
    <div className="timetrail">
      <h3>Distribution of Avg Speeds 📊 </h3>
      {isLoading && throttleMs < 1300 ? renderThrottleMessage() : <Bar options={options} data={data}/>}
    </div>
  )
}


export default DistributionBarChart;
