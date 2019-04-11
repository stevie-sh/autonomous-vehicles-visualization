import React from 'react';
import {getIndexById} from '../utils';
import TimeTrailChart from './TimeTrailChart';
import DistributionChart from './DistributionChart';
import RideList from './RideList';

const SideNav = ({paths, clickedPathId, handleClick, handleNavClick, handleToggle, toggleThrottle, isLoading, isControlPanelExpanded}) => {
    const clickedPathIndex = getIndexById(clickedPathId, paths);
    const clickedPath = paths[clickedPathIndex];
    return (
      <div className="control-panel" style={isControlPanelExpanded ? {} : {width: '200px', padding : '0px'}}>
        <h2>Rides 🚗 </h2>
        <button onClick={handleNavClick}> show/hide </button>
        <DistributionChart 
          isLoading={isLoading}
          paths={paths}
          toggleThrottle={toggleThrottle}
        />
        <TimeTrailChart path={clickedPath}/>
        <RideList 
          isLoading={isLoading}
          handleClick={handleClick}
          paths={paths}
          clickedPathId={clickedPathId}
        />
      </div>
    );
}

export default SideNav;
