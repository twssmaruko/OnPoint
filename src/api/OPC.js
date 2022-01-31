import axios from 'axios';

const localServer = "http://localhost:5000";
const deploymentServer = "192.168.1.143:5000";

const instance =  axios.create ({
    baseURL: localServer,
});

export default instance;
