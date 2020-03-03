import * as actions from '../Actions/type';
const initSate = {
    notices:[],
};

const NoticesReducer = (state = initSate, action) => {
  switch (action.type) {
    case actions.SET_NOTICES: {
      return {
        ...state,
        notices: [...action.payload],
      };
    }
    default: {
      return state;
    }
  }
};

export default NoticesReducer;
