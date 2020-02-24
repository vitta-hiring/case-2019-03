import { combineReducers } from 'redux';
import auth from './auth';
import signup from './signup';
import drug from './drug';
import drugsinteractions from './drugsinteractions';


const rootReducer = combineReducers({
  auth,
  signup,
  drug,
  drugsinteractions,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
