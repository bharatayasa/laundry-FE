import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://0.0.0.0:3000'
})

export default Api