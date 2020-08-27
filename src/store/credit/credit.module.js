import { XonaduService } from '@/common/api.service';

import { FETCH_CREDIT } from "./actions";
import { FETCH_CREDIT_END } from "./mutations";
import { SET_TOASTER_MESSAGE } from "../user/mutations";

const getDefaultState = () => {
    return {
        credit: false
    }
};

const state = getDefaultState();

const getters = {
    creditBalance(state) {
        return state.credit;
    },
};

const actions = {
    [FETCH_CREDIT]({ commit }) {
        return XonaduService.getCredit()
            .then(({ data }) => {
                commit(FETCH_CREDIT_END, data);
            })
            .catch(error => {
                console.log(error);
                commit(SET_TOASTER_MESSAGE, { state: true, value: 'Failed to check credit' });
            });
    },
};

const mutations = {
    [FETCH_CREDIT_END](state, data) {
        state.credit = data.credit_sms;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
