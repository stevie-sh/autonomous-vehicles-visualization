import {countBy, map, prop} from 'ramda';
/**
 * @param paths {Array} - all the deckgl paths rendered
 * @returns {Object} - object of speeds grouped by tens up to 70
 */
const createDistribution = (paths) => {
  const speeds = map(prop('speed'), paths); 
  const bucket = (num) => {
    if (num >= 70) return 7;
    return Math.floor(num/10);
  }

  const distribution = countBy(bucket, speeds);
  return distribution;
}

export default createDistribution;
