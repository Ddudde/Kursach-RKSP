import { combineReducers } from "redux";
import checkBoxReducer from "./reducers/checkBoxReducer";
import clientReducer from "./reducers/clientReducer";
import themeReducer from "./reducers/themeReducer";
import indicatorReducer from "./reducers/indicatorReducer";
import newsReducer from "./reducers/newsReducer";
import contactReducer from "./reducers/contactReducer";
import statusReducer from "./reducers/statusReducer";
import dnevnikReducer from "./reducers/dnevnikReducer";

export default combineReducers({
    checkbox: checkBoxReducer,
    themes: themeReducer,
    indicators: indicatorReducer,
    news: newsReducer,
    contacts: contactReducer,
    states: statusReducer,
    dnevnik: dnevnikReducer
});