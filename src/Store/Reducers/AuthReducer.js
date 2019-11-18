import * as actions from "../Actions/type";

const initSate = {
    user: null,
};

const AuthReducer = (state = initSate, action) => {

    switch (action.type) {

        case actions.LOGIN: {

            let user = { ...action.payload.user };

            user.auth = {
                ...action.payload.auth,
                accessToken: action.payload.access_token
            };

            //localStorage.mpsetUser = JSON.stringify(user);
            return {
                ...state,
                user
            };
        }


        case actions.LOGOUT: {
            //localStorage.mpsetUser = null;
            return {
                ...state,
                user: null
            };
        }

        default: {
            return state;
        }
    }

};

export default AuthReducer;