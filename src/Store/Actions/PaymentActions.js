import * as actions from './type';
import axios from 'axios';
import APIModel from '../../Models/APIModal';

const fallBackErrorMessage = 'Something went wrong, please try again later!';

const getPayments = options => async dispatch => {
    const { filter, token, onError, onSuccess } = options;
    let queryString = '';
    Object.keys(filter).forEach(key => {
        queryString = `${queryString}${key}=${filter[key]}&`;
    });
    try {

        const res = await axios.get(`${APIModel.HOST}/admin/partner/transactions?${queryString}`, {
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        dispatch({
            type: actions.SET_PAYMENTS,
            payload: res.data.data
        });

        if (onSuccess) {
            onSuccess();
        }

    } catch (error) {
        const { data } = error.response;
        const message = data.message || error.message || fallBackErrorMessage;
        if (onError) {
            onError(message);
        }
    }
};


const updatePayment = options => async dispatch => {
    const { data, id, token, onError,onSuccess } = options;
    try {

        const {data:{message}} = await axios.post(`${APIModel.HOST}/admin/partner/transactions/`+data.id, data, {
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if(onSuccess){
            onSuccess(message);
        }

    } catch (error) {
        const { data } = error.response;
        const message = data.message || error.message || fallBackErrorMessage;
        if (onError) {
            onError(message);
        }
    }
};
const addPayment = options => async dispatch => {
    const { data, token, onError,onSuccess } = options;
    try {

        const {data:{message, payment}} = await axios.post(`${APIModel.HOST}/auth/user/transactions`,data, {
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        dispatch({
            type: actions.ADD_PAYMENT,
            payload: payment
        });

        if(onSuccess){
            onSuccess(message);
        }

    } catch (error) {
        const { data } = error.response;
        const message = data.message || error.message || fallBackErrorMessage;
        if (onError) {
            onError(message);
        }
    }
};

export { getPayments, addPayment, updatePayment };
