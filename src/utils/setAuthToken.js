import axios from 'axios';

const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['X-AUTH-TOKEN'] = token;
    } else {
        delete axios.defaults.headers.common['X-AUTH-TOKEN']
    }
}

export default setAuthToken;