import { combineReducers } from "redux";
import checkBoxReducer from "./checkBoxReducer";
import clientReducer from "./clientReducer";
import themeReducer from "./themeReducer";
import indicatorReducer from "./indicatorReducer";

export default combineReducers({
    checkbox: checkBoxReducer,
    themes: themeReducer,
    indicators: indicatorReducer,
    client: clientReducer
});