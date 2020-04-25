import { combineReducers } from "redux";

import authReducer from "./reducers/authReducer-reducer";
import errorReducer from "./reducers/error.reducer";
import profileReducer from "./reducers/profile.reducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
});
