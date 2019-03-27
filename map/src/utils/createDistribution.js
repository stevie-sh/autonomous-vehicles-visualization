import {countBy, not, has, map, prop} from 'ramda';
/**
 * helper fn to create speed distribution
 * @param paths {Array} - all the deckgl paths rendered
 * @returns {Object} - object of speeds grouped by tens up to 70
 */
const createDistribution = (paths, numBuckets) => {
  const speeds = map(prop('speed'), paths); 
  const bucket = (num) => {
    if (num >= 70) return 7;
    return Math.floor(num/10);
  }

  const distribution = countBy(bucket, speeds);

  // wish this used a map instead...
  // make sure all buckets have count of 0 instead of not existing
  for (let i = 0; i < numBuckets; i++) {
    if (not(has(i, distribution))) {
      distribution[i] = 0;
    }
  }

  return distribution;
}

export default createDistribution;
