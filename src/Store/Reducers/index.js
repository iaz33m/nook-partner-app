import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ComplainsReducer from './ComplainsReducer';
import NookReducer from './NookReducer';

const rootReducers = combineReducers({
  AuthReducer,
  ComplainsReducer,
  NookReducer
});

export default rootReducers;
