import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://kitchen-planer.firebaseio.com/'
});

export default instance;
