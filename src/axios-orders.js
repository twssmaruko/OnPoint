import axios from 'axios';

const instance = axios.create({
  // eslint-disable-next-line comma-dangle
  baseURL: 'https://onpoint-construction-b026f.firebaseio.com/'
});

export default instance;
