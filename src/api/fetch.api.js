import axios from 'axios';

const baseURL = "http://localhost:8000/api/";
// const baseURL = "https://api.akusaralawoffice.com/api_pelayanan/api/";

export default {
    baseUrl: baseURL,
    doFetch: async (url, body, headers) => {
        let reqBody = null;
        const token = sessionStorage.getItem("token");
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;

        // Request data
        if (!body) {
            reqBody = "";
        } else {
            reqBody = body;
        }

        // Request headers
        let reqHeaders = null;
        const configHeaders = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        if (!headers) {
            reqHeaders = "";
        } else {
            reqHeaders = configHeaders;
        }

        const requestURL = baseURL + url;

        const httpOptions = {
            json: {
                request: reqBody
            },
            timeout: 20000
        };

        const requestHeaders = reqHeaders

        try {
            const response = await axios.get(requestURL, httpOptions, requestHeaders);
            const data = await response.data.data;
            const dataResponse = data;

            return dataResponse;
        } catch (error) {
            error.message

            return null;
        }
    },

    doPost: async (url, body) => {
        const token = sessionStorage.getItem("token");
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;

        let reqBody = null;

        if (!body) {
            reqBody = "";
        } else {
            reqBody = body;
        }

        const requestURL = baseURL + url;

        try {
            const response = await axios.post(requestURL, reqBody);
            // const data = await response.data;
            const dataResponse = response;
            // console.log('responsess', response);

            return dataResponse;
        } catch (error) {
            console.log(error.message);

            return null;
        }
    },
};