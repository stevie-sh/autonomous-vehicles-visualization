import {findIndex, propEq} from 'ramda';

/**
 * @param {id} - unique uuid assigned to a rendered ride
 * @param {paths} - list of paths as defined by deck.gl
 * @returns {Number} - index of path
 */
const getIndexById = (id, paths) => findIndex(propEq('id', id), paths);

export default getIndexById;
