import React, {PureComponent, Component} from 'react';
import {calculateAverageSpeed, getIndexById, formatPathToChart} from '../utils';
import Spinner from './Spinner';
import TimeTrailChart from './TimeTrailChart';
import DistributionBarChart from './DistributionBarChart';
import moment from 'moment';

const SideNav = ({paths, clickedPathId, handleClick, handleToggle, toggleThrottle, isLoading, throttleMs}) => {
    const clickedPathIndex = getIndexById(clickedPathId, paths);
    const path = paths[clickedPathIndex];
    return (
      <div className="control-panel">
        <h2>Rides 🚗 </h2>
        <DistributionBarChart isLoading={isLoading} paths={paths} toggleThrottle={toggleThrottle} throttleMs={throttleMs}/>
        <TimeTrailChart path={path}/>
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

export default SideNav;
