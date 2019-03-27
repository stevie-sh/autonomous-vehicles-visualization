import {join} from 'path';

const DATA_DIRECTORY = 'data';
const RIDE_FILEPATH = 'filenames.json';

const getRideFilenames = async () => {
  const path = join(__dirname, DATA_DIRECTORY, RIDE_FILEPATH);
  const config = {
    method : 'GET',
  }
  try {
    const res = await fetch(path, config);
    const fileNames = await res.json();
    return fileNames;
  } catch(e) {
    throw e;
  }
}

const getRide = async (filename) => {
  const path = join(__dirname, DATA_DIRECTORY, filename);
  const config = {
    method : 'GET',
  }
  try {
    const res = await fetch(path, config);
    const ride = await res.json();
    return ride;
  } catch(e) {
    throw e;
  }
}

export {getRide, getRideFilenames};
