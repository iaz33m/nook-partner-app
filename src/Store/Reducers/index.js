import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ComplainsReducer from './ComplainsReducer';
import NookReducer from './NookReducer';
import BookingsReducer from './BookingsReducer';
import NoticesReducer from './NoticesReducer';
import ShiftsReducer from './ShiftsReducer';
import VisitsReducer from "./VisitsReducer";
import ReceiptReducer from "./ReceiptReducer";
import PaymentReducer from "./PaymentReducer";

const rootReducers = combineReducers({
  AuthReducer,
  ComplainsReducer,
  NookReducer,
  BookingsReducer,
  NoticesReducer,
  ShiftsReducer,
  VisitsReducer,
  ReceiptReducer,
  PaymentReducer,
});

export default rootReducers;
