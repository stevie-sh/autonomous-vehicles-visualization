import React, {PureComponent, Component} from 'react';
import {calculateAverageSpeed, getIndexById, formatPathToChart} from '../utils';
import {Line} from 'react-chartjs-2';
import Spinner from './Spinner';
import moment from 'moment';

const SideNav = ({paths, clickedPathId, handleClick, isLoading}) => {
    const clickedPathIndex = getIndexById(clickedPathId, paths);
    return (
      <div className="control-panel">
        <h2>Rides 📊 </h2>
        <TimeTrailChart path={paths[clickedPathIndex]}/>
        <h3>Live View {isLoading ? <Spinner /> : <>✅</> } </h3>
          <ul id="live-view-list" className="unstyle-list">
            {paths.map(({name, id, speed}) => {
              const isClicked = clickedPathId === id;
              return (
                <li 
                  key={id} 
                  style={isClicked ? {backgroundColor: 'pink'} : {backgroundColor: 'initial'}} 
                  className="unstyle-list-item"
                  onClick={() => handleClick(id)}
                  >
                  <span>{name}</span>
                  <span> {speed || -1} mph</span>
                  <span> > </span>
                </li>
              )
            })}
          </ul>
      </div>
    );
}

const data = {
  labels: [],
  datasets: [
    {
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
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

const TimeTrailChart = ({path}) => {
  const options = {
    legend: {
      display: false
    },
    scales : {
      xAxes: [{
        type: 'time',
        time : {
          unit: 'minute',
        }
      }]
    },
  }

  const dataP = formatPathToChart(path);

  return (
    <div className="timetrail">
      <h3>Time Trail 👁️  </h3>
      <Line options={options} data={dataP}/>
    </div>
  )
}

export default SideNav;
