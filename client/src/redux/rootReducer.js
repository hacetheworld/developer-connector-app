import { combineReducers } from "redux";

import authReducer from "./reducers/authReducer-reducer";
import errorReducer from "./reducers/error.reducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
});
