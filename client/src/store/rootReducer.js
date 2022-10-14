import { combineReducers } from "redux";
import checkBoxReducer from "./checkBoxReducer";

export default combineReducers({
    checkbox: checkBoxReducer
});