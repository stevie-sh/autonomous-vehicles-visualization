import {prop, props, map, } from 'ramda';
import {interpolateCubehelixDefault} from 'd3-scale-chromatic';
import {rgb} from 'd3-color';
import moment from 'moment';
import uuidv4 from './uuid';
import calculateAverageSpeed from './averageSpeeds'
import Chance from 'chance';



/**
 * @param {Object} - a single object representing a ride, for this project as the parsed json
 * @returns {Object} - a single path formatted for rendering onto the map, this path definition is
 * used throughout the app.
 */
const preprocess = (ride) => {
  const generateColor = () => {
    const rgbColorStr = interpolateCubehelixDefault(Math.random())
    const rgbColor = rgb(rgbColorStr)
    const hexColor = rgbColor.hex()
    return hexColor;
  }

  /* Extract colors */
  const color = generateColor();

  /* Extract names */
  const chance = new Chance()
  const name = chance.name({nationality: 'it'}) //lol

  /* Extract average speed of full ride */
  const speed = calculateAverageSpeed(ride);


  /* Generate random id */
  const id = uuidv4();

  const [startTime, endTime] = props(['start_time', 'end_time'], ride);


  /* Extract and format coordinates, reversing [lat,lng] to [lng,lat] */
  const coords = prop('coords', ride);
  const formatCoords = props(['lng', 'lat']);
  const path = map(formatCoords, coords);


  /* Extract speeds */
  const speeds = map(prop('speed'), coords);
  const _speeds = []
  for (let i = 0; i < speeds.length; i++) {
    if (i === speeds.length - 1) {
      _speeds.push({x: endTime, y: speeds[speeds.length-1]})
      continue;
    }
    const time = moment(startTime).add(i, 's').format('YYYY-MM-DDTHH:mm:ss');
    _speeds.push({x: time, y: speeds[i]});
  }

  return {
    id,
    name,
    color,
    speed,
    startTime,
    endTime,
    path,
    speeds: _speeds,
  }
}


export default preprocess;
