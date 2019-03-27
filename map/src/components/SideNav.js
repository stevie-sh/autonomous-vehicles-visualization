import React, {PureComponent, Component} from 'react';
import {calculateAverageSpeed, getIndexById, formatPathToChart} from '../utils';
import Spinner from './Spinner';
import TimeTrailChart from './TimeTrailChart';
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

export default SideNav;
