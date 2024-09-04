import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://0.0.0.0:3000'
    // baseURL: 'https://chilitify-433503.lm.r.appspot.com/'
})

export default Api
