import { XonaduService } from '@/common/api.service';
import ApiService from "@/common/api.service";

import { LOGIN } from "./actions";
import { LOGOUT, SET_AUTH_HEADER, FETCH_ACCOUNT_OVERVIEW_END, RETRIEVE_API_KEY_FROM_LOCAL_STORAGE, UPDATE_API_KEY } from "./mutations";

const getDefaultState = () => {
    return {
        customerName: '',
        apiKey: ''
    }
};

const state = getDefaultState();

const getters = {
    customerName(state) {
        return state.customerName;
    },

    checkLoginStatus(state) {
        if (state.customerName === "") {
            return false;
        }
        return true;
    }
};

const actions = {
    [LOGIN]({ commit }) {
        let localStorageApiKey = localStorage.apiKey;
        commit(SET_AUTH_HEADER, localStorageApiKey);
        return XonaduService.fetchAccountOverview()
            .then(({ data }) => {
                commit(FETCH_ACCOUNT_OVERVIEW_END, data);
                return data;
            })
            .catch(error => {
                console.log(error);
                return false;
            });
    },

};

const mutations = {
    [RETRIEVE_API_KEY_FROM_LOCAL_STORAGE](state) {
        if (typeof localStorage.apiKey !== 'undefined') {
            state.apiKey = localStorage.apiKey;
        }
    },
    [SET_AUTH_HEADER](state, localStorageApiKey) {
        ApiService.setHeader(localStorageApiKey);
    },
    [FETCH_ACCOUNT_OVERVIEW_END](state, data) {
        state.customerName = data.customer_name;
    },
    [UPDATE_API_KEY](state, data) {
        localStorage.apiKey = data.value;
    },

    [LOGOUT](state) {
        state.customerName = '';
        state.apiKey = '';
        localStorage.removeItem('apiKey');
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
};
