import {type, clone} from 'ramda';

const dataTemplate = {
  labels: [],
  datasets: [
    {
      label: '',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: []
    }
  ]
};

/**
 * @param path {Object} - path object as defined by deck.gl
 * @returns {Object} defines the data for given path to render in chartjs
 */
const formatPathToChart = (path) => {
  if (type(path) !== 'Object') {
    return {
      labels: [],
      datasets: clone(dataTemplate.datasets)
    }
  }
  const datasets = clone(dataTemplate.datasets);
  datasets[0].data = path.speeds.slice();
  const {startTime, endTime} = path;
  const data = {
    labels: [startTime,endTime],
    datasets,
  }
  return data;
};


export default formatPathToChart;
