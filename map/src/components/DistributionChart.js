import React, {PureComponent} from 'react';
import {Bar} from 'react-chartjs-2';
import {createDistribution, histogramOptions as options} from '../utils';
import Spinner from './Spinner';
import {values} from 'ramda';

const DistributionChart = ({paths, toggleThrottle, isLoading, throttleMs=1300}) => {
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

  const dataP = values(createDistribution(paths));
  data.datasets[0].data = dataP.slice();

  //TODO: Toggle the throttler to change the speed of requests and disable/enable the live viewing!
  const renderThrottleMessage = () => (
    <>
      <Spinner />
      <button onClick={toggleThrottle}> Slow down requests to see chart live!</button>
    </>
  )

  return (
    <div className="timetrail">
      <h3>Distribution of Avg Speeds 📊 </h3>
      {isLoading && throttleMs < 1300 ? renderThrottleMessage() : <Bar options={options} data={data}/>}
    </div>
  )
}


export default DistributionChart;
