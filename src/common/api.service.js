import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

const xonaduUrl = 'apis/xonadu';

const ApiService = {
    init() {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = '/';
        Vue.axios.defaults.timeout = 10000;
    },

    setHeader(apiKey) {
        Vue.axios.defaults.headers.common.Authorization = apiKey;
    },

    get(baseUrl, resource) {
        return Vue.axios.get(`${baseUrl}/${resource}`).catch(error => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    },

    post(baseUrl, resource, params) {
        const url = `${baseUrl}/${resource}`;
        return Vue.axios.post(url, params);
    },
};

export default ApiService;

export const XonaduService = {
    fetchAccountOverview() {
        return ApiService.get(xonaduUrl, "v1/account");
    },

    getCredit() {
        return ApiService.get(xonaduUrl, "v1/account/credit");
    },

    sendSms(message) {
        return ApiService.post(xonaduUrl, "v1/message", message);
    },

    checkSmsDeliveryStatus(requestId) {

        return ApiService.get(xonaduUrl, `v1/message/${requestId}`);
    }
};
