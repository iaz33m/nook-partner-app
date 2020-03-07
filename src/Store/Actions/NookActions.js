import * as actions from './type';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import APIModel from '../../Models/APIModal';

const fallBackErrorMessage = 'Something went wrong, please try again later!';

const getMyNookDetails = options => async dispatch => {
    const { token, onError,onSuccess } = options;
    try {

        const res = await axios.get(`${APIModel.HOST}/auth/user/nook`, {
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        dispatch({
            type: actions.SET_MY_NOOK,
            payload: res.data
        });

        if(onSuccess){
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



const addReivew = options => async dispatch => {
    const { data, token, onError,onSuccess } = options;
    try {

        const {data:{review,message}} = await axios.post(`${APIModel.HOST}/auth/user/nook/review`,data, {
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        dispatch({
            type: actions.SET_NOOK_REVIEW,
            payload: review
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

export { getMyNookDetails,addReivew };