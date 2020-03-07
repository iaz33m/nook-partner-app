import * as actions from './type';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import * as Facebook from 'expo-facebook';
import * as Google from "expo-google-app-auth";
import APIModel from '../../Models/APIModal';
import { CLIENT_IDS } from "../../helper/Constants"

const FACEBOOK_CLIENT_ID = CLIENT_IDS._facebook;
const ANDROID_CLIENT_ID = CLIENT_IDS._google;


const fallBackErrorMessage = 'Something went wrong, please try again later!';

const register = options => async dispatch => {
  const { data, onSuccess, onError } = options;
  try {

    const { data: user } = await axios.post(`${APIModel.HOST}/auth/register`, data, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    const message = user.message;
    delete user.message;

    // dispatch({
    //   type: actions.LOGIN,
    //   payload: {
    //     user,
    //   },
    // });

    if (onSuccess) {
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

const sendPasswordsResetCode = options => async () => {
  const { data, onSuccess, onError } = options;
  try {

    const { data: response } = await axios.post(`${APIModel.HOST}/passwordsReset/send`, data, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (onSuccess) {
      onSuccess(response);
    }
  } catch (error) {
    const { data } = error.response;
    const message = data.message || error.message || fallBackErrorMessage;

    if (onError) {
      onError(message);
    }
  }
};

const changePassword = options => async () => {
  const { data, onSuccess, onError } = options;
  try {

    const { data: response } = await axios.post(`${APIModel.HOST}/passwordsReset/change`, data, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (onSuccess) {
      onSuccess(response);
    }
  } catch (error) {
    const { data } = error.response;
    const message = data.message || error.message || fallBackErrorMessage;

    if (onError) {
      onError(message);
    }
  }
};

const sendNumberVerificationCode = options => async () => {
  const { data, onSuccess, onError } = options;
  try {

    const { data: response } = await axios.post(`${APIModel.HOST}/user/numberVerification/send`, data, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (onSuccess) {
      onSuccess(response);
    }
  } catch (error) {
    const { data } = error.response;
    const message = data.message || error.message || fallBackErrorMessage;

    if (onError) {
      onError(message);
    }
  }
};

const verifyNumber = options => async () => {
  const { data, onSuccess, onError } = options;
  try {

    const { data: response } = await axios.post(`${APIModel.HOST}/user/numberVerification/verify`, data, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (onSuccess) {
      onSuccess(response);
    }
  } catch (error) {
    const message = error.message || fallBackErrorMessage;
    if (onError) {
      onError(message);
    }
  }
};

const login = options => async dispatch => {
  const { data, onSuccess, onError } = options;
  try {

    const { data: user } = await axios.post(`${APIModel.HOST}/auth/login`, data, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    const message = user.message;
    delete user.message;

    dispatch({
      type: actions.LOGIN,
      payload: {
        user,
      },
    });

    if (onSuccess) {
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

const syncWithAsyncStorage = options => async dispatch => {
  try {

    const { onSuccess, onError } = options;
    let user = await AsyncStorage.getItem('user');
    let skiped = await AsyncStorage.getItem('skiped');

    user = JSON.parse(user);


    dispatch({
      type: actions.SYNC_WITH_ASYNC_STORAGE,
      payload: {
        user, skiped
      },
    });

    if (onSuccess) {
      onSuccess({
        user, skiped
      });
    }
  } catch (error) {
    const { data } = error.response;
    const message = data.message || error.message || fallBackErrorMessage;

    if (onError) {
      onError(message);
    }
  }
};

const getSocialUser = async (provider) => {
  if (provider === 'google') {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await Google.logInAsync({
          // iosClientId: IOS_CLIENT_ID,
          issuer: 'https://accounts.google.com',
          androidClientId: ANDROID_CLIENT_ID,
          scopes: ["profile", "email"]
        });

        if (result.type === "success") {
          const { user: {
            id: provider_user_id,
            name
          } } = result;
          return resolve({ provider_user_id, name, provider });
        }

        reject(new Error('User Canceled Login Process'));

      } catch (error) {
        reject(error)
      }
    });
  }


  // facebook

  return new Promise(async (resolve, reject) => {
    try {

      console.log('Making Request');

      await Facebook.initializeAsync(FACEBOOK_CLIENT_ID);

      console.log('Making Request');

      const {
        type,
        token,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"]
      });

      console.log({type});

      if (type === "success") {
        console.log({token});
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        const {
          id: provider_user_id,
          name
        } = await response.json();
        return resolve({
          provider_user_id,name,provider
        });
      }

      return reject(new Error('User Canceled Login Process'));

    } catch (error) {
      reject(error)
    }
  });
}
const socialLogin = options => async dispatch => {
  const { data, onSuccess, onError } = options;
  try {

    let socialUser = await getSocialUser(data.provider);
    const { data: user } = await axios.post(`${APIModel.HOST}/auth/socialLogin`, socialUser, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    const message = user.message;
    delete user.message;

    dispatch({
      type: actions.LOGIN,
      payload: {
        user,
      },
    });

    if (onSuccess) {
      onSuccess(message);
    }
  } catch (error) {
    const message = error.message || fallBackErrorMessage;
    if (onError) {
      onError(message);
    }
  }
};

const logout = options => async (dispatch) => {
  const { onSuccess, onError, token } = options;
  try {


    const { data: { message } } = await axios.post(`${APIModel.HOST}/auth/logout`, {}, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    dispatch({
      type: actions.LOGOUT,
    });

    if (onSuccess) {
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

export { register, syncWithAsyncStorage, sendPasswordsResetCode, changePassword, sendNumberVerificationCode, verifyNumber, login, socialLogin, logout };