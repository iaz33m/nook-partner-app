import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ComplainsReducer from './ComplainsReducer';
import NookReducer from './NookReducer';
import BookingsReducer from './BookingsReducer';
import NoticesReducer from './NoticesReducer';
import ShiftsReducer from './ShiftsReducer';

const rootReducers = combineReducers({
  AuthReducer,
  ComplainsReducer,
  NookReducer,
  BookingsReducer,
  NoticesReducer,
  ShiftsReducer
});

export default rootReducers;
