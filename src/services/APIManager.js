const axios = require('axios');
console.log(process.env.API_URL)
axios.defaults.baseURL = process.env.API_URL;

axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const error = {
    network: "Request timed out. Please try again later.",
    notfound: "Something went wrong. Please try again.",
}

export default {
    axios,
    error,
};
