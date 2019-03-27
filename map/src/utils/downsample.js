/**
 * @param sample {Array}
 * @param size {Number}
 * An optimization for charting large datasets.
 * Picking every `size` elements to make rendered dataset smaller
 */
const downsample = (sample,size) => {
  const isSize = (el, idx) => idx % size ===  0;
  return sample.filter(isSize);
}

export default downsample;
