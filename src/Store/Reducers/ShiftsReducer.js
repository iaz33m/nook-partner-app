import * as actions from '../Actions/type';
const initSate = {
  shifts: [],
};

const ShiftsReducer = (state = initSate, action) => {
  switch (action.type) {
    case actions.SET_SHIFTS: {
      return {
        ...state,
        shifts: [...action.payload],
      };
    }

    case actions.ADD_SHIFT: {
      return {
        ...state,
        shifts: [
          { ...action.payload },
          ...state.shifts,
        ],
      };
    }

    default: {
      return state;
    }
  }
};

export default ShiftsReducer;
