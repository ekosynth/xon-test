import { XonaduService } from '@/common/api.service';

import { CHECK_DELIVERY_STATUS, SEND_SMS } from "./actions";
import { UPDATE_SEND_SMS, RESET_DEFAULT_NEW_SMS, QUEUE_DELIVERY_RECEIPT_CHECK, REMOVE_REQUEST_ID_FROM_QUEUE, SET_TOASTER_MESSAGE, DISMISS_TOASTER_MESSAGE } from "./mutations";
import { FETCH_CREDIT } from '../credit/actions';

const getDefaultState = () => {
    return {
        newSms: {
            destinations: '',
            originator: '',
            body: '',
        },
        deliveryReceiptCheckQueue: [],
        toasterMessage: {
            state: false,
            value: "",
        },
    }
};

const state = getDefaultState();

const getters = {
    newSmsRecipient(state) {
        return state.newSms.recipient;
    },
};

const actions = {
    [SEND_SMS]({ commit, dispatch }) {
        // Put this here as it will get lost with reset
        const newSms = state.newSms;
        return XonaduService.sendSms(newSms)
            .then(({ data }) => {
                commit(SET_TOASTER_MESSAGE, { state: true, value: 'SMS sent' });
                dispatch(FETCH_CREDIT);
                commit(RESET_DEFAULT_NEW_SMS);
                commit(QUEUE_DELIVERY_RECEIPT_CHECK, data.destinations[0].message_id);
                return data;
            })
            .catch(error => {
                console.log(error);
                commit(SET_TOASTER_MESSAGE, { state: true, value: 'SMS failed to send' });
            });
    },

    [CHECK_DELIVERY_STATUS]({ commit }) {
        state.deliveryReceiptCheckQueue.forEach(messageId => {
            XonaduService.checkSmsDeliveryStatus(messageId)
                .then(({ data }) => {
                    console.log(data.destination);
                    commit(SET_TOASTER_MESSAGE, { state: true, value: `SMS Delivered to : ${data.destination}` });
                    commit(REMOVE_REQUEST_ID_FROM_QUEUE, messageId);
                    return data;
                })
                .catch(error => {
                    console.log(error);
                    commit(SET_TOASTER_MESSAGE, { state: true, value: 'Failed to check SMS status' });
                    commit(REMOVE_REQUEST_ID_FROM_QUEUE, messageId);
                });
        })
        return;
    }
};

const mutations = {
    [QUEUE_DELIVERY_RECEIPT_CHECK](state, messageId) {
        state.deliveryReceiptCheckQueue.push(messageId)
    },
    [RESET_DEFAULT_NEW_SMS](state) {
        state.newSms = getDefaultState().newSms;
    },
    [UPDATE_SEND_SMS](state, data) {
        if (data.objectKey !== undefined) {
            state.newSms[data.objectKey][0][data.key] = data.value;
        } else {
            state.newSms[data.key] = data.value;
        }
    },
    [REMOVE_REQUEST_ID_FROM_QUEUE](state, messageId) {
        console.log(messageId);
        state.deliveryReceiptCheckQueue = [];
    },
    [SET_TOASTER_MESSAGE](state, data) {
        state.toasterMessage.state = true;
        state.toasterMessage.value = data.value;
    },
    [DISMISS_TOASTER_MESSAGE](state) {
        state.toasterMessage.state = false;
        state.toasterMessage.value = '';
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
