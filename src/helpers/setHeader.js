import axios from 'axios';
import loggedInUser from './loggedInUser';

/**
 * @method setHeader
 * @description sets authorization header with user's token
 * @param {object} response The HTTP response
 *
 * @returns {void}
 */
const setHeader = () => {
  axios.defaults.headers.common.Authorization = `${loggedInUser()}`;
};

export default setHeader;
