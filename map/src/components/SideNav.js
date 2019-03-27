import React from 'react';
import {getIndexById} from '../utils';
import TimeTrailChart from './TimeTrailChart';
import DistributionChart from './DistributionChart';
import RideList from './RideList';

const SideNav = ({paths, clickedPathId, handleClick, handleToggle, toggleThrottle, isLoading}) => {
    const clickedPathIndex = getIndexById(clickedPathId, paths);
    const clickedPath = paths[clickedPathIndex];
    return (
      <div className="control-panel">
        <h2>Rides 🚗 </h2>
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
