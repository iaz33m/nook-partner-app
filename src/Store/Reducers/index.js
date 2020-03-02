import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ComplainsReducer from './ComplainsReducer';

const rootReducers = combineReducers({
  AuthReducer,
  ComplainsReducer
});

export default rootReducers;
