import { combineReducers } from 'redux';
import auth from './auth';
import signup from './signup';
import drug from './drug';
import drugsinteractions from './drugsinteractions';
import medicine from './medicines';
import prescription from './prescriptions';


const rootReducer = combineReducers({
  auth,
  signup,
  drug,
  drugsinteractions,
  medicine,
  prescription
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
