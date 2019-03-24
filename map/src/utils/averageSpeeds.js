import {pick} from 'ramda';

const _pickData = (path) => {
  const {start_time: startTime, end_time: endTime, coords} = path;
  const len = coords.length;
  const startDist = coords[0].dist;
  const endDist = coords[len-1].dist;
  return {
    endTime,
    startTime,
    endDist,
    startDist,
  }
}

const roundToTwoDecimals = (num) => Math.round(num * 100) / 100;

/**
 * determines average speed via distance / time using end_time - start_time
 * note that this is likely not highly precise as using the speedometer data
 * @returns {Number}
 */
const calculateAverageSpeed = (path) => {
  const {endTime, startTime, endDist, startDist} = _pickData(path);
  const msElapsed = Date.parse(endTime) - Date.parse(startTime);
  const sElapsed = msElapsed / 1000;
  const hours = sElapsed / (60 * 60);

  const distTravelled = endDist - startDist;
  const averageSpeed = distTravelled / hours;
  return roundToTwoDecimals(averageSpeed);
}

export default calculateAverageSpeed;
