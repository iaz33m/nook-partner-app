import * as actions from './type';
import axios from 'axios';
import APIModel from '../../Models/APIModal';

const fallBackErrorMessage = 'Something went wrong, please try again later!';

const getReceipts = options => async dispatch => {
    const { filter, token, onError, onSuccess } = options;
    let queryString = '';
    Object.keys(filter).forEach(key => {
        queryString = `${queryString}${key}=${filter[key]}&`;
    });
    try {

        const res = await axios.get(`${APIModel.HOST}/admin/partner/receipts?${queryString}`, {
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        dispatch({
            type: actions.SET_RECEIPTS,
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

const generateReceipt = options => async dispatch => {
    const { data, token, onError,onSuccess } = options;
    
    try {

        const {data:{message}} = await axios.post(`${APIModel.HOST}/admin/partner/receipts`,data, {
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

const publishReceipt = options => async dispatch => {
    const { data, token, onError,onSuccess } = options;
    
    try {

        const {data:{message}} = await axios.post(`${APIModel.HOST}/admin/partner/receipts/publish`,data, {
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

const payReceipt = options => async dispatch => {
    const { data, id, token, onError,onSuccess } = options;
    
    try {

        const {data:{message}} = await axios.post(`${APIModel.HOST}/admin/partner/receipts/pay/${id}`,data, {
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

export { 
    getReceipts ,
    generateReceipt,
    publishReceipt,
    payReceipt,
};