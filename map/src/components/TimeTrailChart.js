import React from 'react';
import {Line} from 'react-chartjs-2';
import {formatPathToChart, timeSeriesOptions as options} from '../utils';

const TimeTrailChart = ({path}) => {

  const data = formatPathToChart(path);

  return (
    <div className="timetrail">
      <h3>Time Trail 👁️  </h3>
      <Line options={options} data={data}/>
    </div>
  )
}

export default TimeTrailChart;

