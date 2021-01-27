import axios from 'axios';
const officialURL = 'https://onpoint-construction-b026f.firebaseio.com/'
const testURL = 'https://onpoint-construction.firebaseio.com/'
const instance = axios.create({
  // eslint-disable-next-line comma-dangle
  baseURL: testURL
});

export default instance;
