const sleep = (ms) => {
  const SECOND_IN_MS = 1000;
  return new Promise(resolve => setTimeout(resolve, ms || SECOND_IN_MS));
}
/**
 * Simple throttling for this app.
 * @param fn {Function} - fn to call.
 * @param ms {Number} - how long to sleep to throttle
 */
const throttle = async (fn, ms, ...args) => {
  const res = await fn(...args);
  await sleep(ms);
  return res;
}


export default throttle;
