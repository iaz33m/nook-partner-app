import * as actions from '../Actions/type';

const initSate = {
    nook:null,
    review:null,
    nooks:[],
};

const NookReducer = (state = initSate, action) => {
  switch (action.type) {
    case actions.SET_MY_NOOK: {
      const {nook,review} = action.payload;
      return {
        ...state,
        nook,
        review,
      };
    }
    case actions.SET_NOOK_REVIEW: {
      const review = action.payload;
      return {
        ...state,
        review,
      };
    }
    case actions.SET_NOOKS: {
        return {
          ...state,
          nooks: [...action.payload],
        };
      }
    default: {
      return state;
    }
  }
};

export default NookReducer;
