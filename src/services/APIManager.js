const axios = require('axios');

axios.defaults.baseURL = ' https://5efabb3a80d8170016f758ee.mockapi.io';

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
