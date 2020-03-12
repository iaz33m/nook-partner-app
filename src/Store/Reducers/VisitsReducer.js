import * as actions from '../Actions/type';
const initSate = {
    visits:[],
};

const VisitsReducer = (state = initSate, action) => {
  switch (action.type) {
    case actions.SET_VISITS: {
      return {
        ...state,
        visits: [...action.payload],
      };
    }
    default: {
      return state;
    }
  }
};

export default VisitsReducer;
