import * as actions from '../Actions/type';
const initSate = {
    bookings:[],
};

const BookingsReducer = (state = initSate, action) => {
  switch (action.type) {
    case actions.SET_BOOKINGS: {
      return {
        ...state,
        bookings: [...action.payload],
      };
    }

    default: {
      return state;
    }
  }
};

export default BookingsReducer;
